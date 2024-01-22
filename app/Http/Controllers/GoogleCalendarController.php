<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OauthToken;
use App\Models\Task;
use App\Models\TaskUsers;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Google_Client;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleCalendarController extends Controller
{
    public static function redirectOauth(Request $request)
    {
        $googleClient = self::initializeGoogleClient();
        $googleClient->addScope('https://www.googleapis.com/auth/calendar.events');
        $googleClient->setAccessType('offline');
        $googleClient->setPrompt('consent');

        $authUrl = $googleClient->createAuthUrl();

        return redirect($authUrl);
    }

    public static function handleOauth(Request $request)
    {
        // Check if any errors
        if ($request->error) {
            return redirect(RouteServiceProvider::HOME);
        }

        $googleClient = GoogleCalendarController::initializeGoogleClient();
        $googleToken = $googleClient->fetchAccessTokenWithAuthCode($request->code);

        GoogleCalendarController::storeUserToken($googleToken);
        GoogleCalendarController::getEventsAndStore();
        GoogleCalendarController::syncEvents();

        return redirect(RouteServiceProvider::HOME);
    }

    public static function storeUserToken($token)
    {

        $user = Auth::user();

        OauthToken::updateOrCreate(
            ['user_id' => $user->id, 'provider' => 'google'],
            [
                'access_token' => $token['access_token'],
                'refresh_token' => $token['refresh_token'],
                'expires_in' => Carbon::now()->addSeconds($token['expires_in']),
            ]
        );
    }

    // Get the user's Google Calendar events and store them in the database
    public static function getEventsAndStore()
    {
        $user = Auth::user();
        $googleToken = self::getUserToken($user);

        // Initialize the Google Client with access tokens
        $googleClient = self::initializeGoogleClient();
        $googleClient->setAccessToken([
            'access_token' => $googleToken['access_token'],
            'refresh_token' => $googleToken['refresh_token'],
            'expires_in' => Carbon::parse($googleToken['expires_in'])->diffInSeconds(Carbon::now()),
        ]);

        // Get the Google Calendar service
        $service = new Google_Service_Calendar($googleClient);

        $optParams = [
            'orderBy' => 'startTime',
            'singleEvents' => true,
            'timeMin' => Carbon::now()->format(DateTime::RFC3339), // RFC3339 timestamp format required by Google
        ];

        // Get the events from the user's primary calendar
        $events = $service->events->listEvents('primary', $optParams);

        // Store the events in the database
        self::storeEvents($events->getItems(), $user);

        return $events;
    }

    // Sync the user's Google Calendar events with the database
    // Create events in Google Calendar for tasks that don't have an event id
    public static function syncEvents()
    {
        $user = Auth::user();
        $token = self::getUserToken($user);

        $client =  self::initializeGoogleClient();
        $client->setAccessToken($token);
        $service = new Google_Service_Calendar($client);

        // Get the tasks for this user
        $taskUsers = TaskUsers::where('user_id', $user->id)->where('event_id', '')->get();
        $tasks = Task::whereIn('id', $taskUsers->pluck('task_id'))->get();

        // Create events in google calendar
        foreach ($tasks as $task) {
            // Create event object
            $event = self::getGoogleCalendarEvent($task, $user);

            // Add the event to the user's primary calendar
            $createdEvent = $service->events->insert('primary', $event);

            // Update the task_users with the event id
            TaskUsers::where('task_id', $task->id)->where('user_id', $user->id)->update(['event_id' => $createdEvent->id]);
        }
    }


    private static function storeEvents($events, $user)
    {
        foreach ($events as $event) {
            $startDateTime = Carbon::parse($event->start->dateTime);
            $endDateTime = Carbon::parse($event->end->dateTime);

            // Update or create a task for each event
            $task = Task::updateOrCreate(
                ['title' => $event->getSummary(), 'user_id' => $user->id, 'date' => $startDateTime->toDateString()],
                [
                    'start_time' => $startDateTime->toTimeString(),
                    'end_time' => $endDateTime->toTimeString(),
                    'type' => 'event',
                    'assigned_users' => $user->id,
                    // here timezone can be empty, because we are retrieving the events from gcalendar, not inserting them.
                    'timezone' => '',
                ]
            );

            // Update or create a task user for each event
            TaskUsers::updateOrCreate(
                ['task_id' => $task->id, 'user_id' => $user->id],
                ['event_id' => $event->id]
            );
        }
    }

    // Create an event in the user's Google Calendar
    public static function createEvent(Task $task, $user = null): string
    {
        $user = $user ?? Auth::user();
        $token = self::getUserToken($user);

        // If user has not connected to google calendar, do nothing
        if (!$token) return '';

        $client = self::initializeGoogleClient();
        $client->setAccessToken($token);
        $service = new Google_Service_Calendar($client);

        // Create the event object
        $event = self::getGoogleCalendarEvent($task, $user);

        // Add the event to the user's primary calendar
        $createdEvent = $service->events->insert('primary', $event);

        return $createdEvent->id;
    }

    // Delete an event from the user's Google Calendar
    public static function deleteEvent(Task $task, $user = null)
    {
        $user = $user ?? Auth::user();
        $token = self::getUserToken($user);

        // If user has not connected to google calendar, do nothing
        if (!$token) return;

        $client = self::initializeGoogleClient();
        $client->setAccessToken($token);
        $service = new Google_Service_Calendar($client);

        // Get the event id from the database
        $eventId = TaskUsers::where('task_id', $task->id)->where('user_id', $user->id)->first()->event_id;

        // If event id is null, do nothing
        if (!$eventId) return;

        // Try to delete the event from the user's primary calendar
        try {
            // Delete the event from the user's primary calendar
            $service->events->delete('primary', $eventId);
        } catch (\Exception $e) {
            // If the event is not found, do nothing
            if ($e->getCode() == 410) {
                return;
            } else {
                Log::error($e);
            }
        }
    }

    // Update an event in the user's Google Calendar
    public static function updateEvent(Task $task, $user = null)
    {
        $user = $user ?? Auth::user();
        $token = self::getUserToken($user);

        // If user has not connected to google calendar, do nothing
        if (!$token) return;

        $client = self::initializeGoogleClient();
        $client->setAccessToken($token);
        $service = new Google_Service_Calendar($client);

        // Get the event id from the database
        $eventId = TaskUsers::where('task_id', $task->id)->where('user_id', $user->id)->first()->event_id;

        // If event id is null, do nothing
        if (!$eventId) return;

        // Create the event object
        $event = self::getGoogleCalendarEvent($task, $user);

        // Try to update the event in the user's primary calendar        
        // Try-catching is necessary because if the event is deleted from the user's primary calendar,
        // the event id will still be stored in the database, and the update function will throw an error
        try {
            // Update the event in the user's primary calendar
            $service->events->update('primary', $eventId, $event);
        } catch (\Exception $e) {
            // If the event is not found, do nothing
            if ($e->getCode() == 410) {
                return;
            } else {
                Log::error($e);
            }
        }
    }

    // Get the user's google oauth2 token
    public static function getUserToken($user)
    {
        $token = OauthToken::where('user_id', $user->id)->where('provider', 'google')->first();

        if ($token) {
            return [
                'access_token' => $token->access_token,
                'expires_in' => Carbon::parse($token->expires_in)->diffInSeconds(Carbon::now()),
                'refresh_token' => $token->refresh_token,
            ];
        }

        return null;
    }

    // Initialize the Google Client with secret keys and user's token
    public static function initializeGoogleClient($redirectUri = null)
    {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri($redirectUri ?? env('GOOGLE_REDIRECT_CALLBACK_CALENDAR'));

        return $client;
    }

    // Get the Google Calendar event object
    public static function getGoogleCalendarEvent($task, $user)
    {
        return new Google_Service_Calendar_Event([
            'summary' => $task->title,
            // TODO: store timezone in user's table rather than task's table
            'start' => [
                'dateTime' => Carbon::createFromFormat('Y-m-d H:i', $task->date . ' ' . $task->start_time, $task->timezone)->format(DateTime::RFC3339),
                'timeZone' => $task->timezone,
            ],
            'end' => [
                'dateTime' => Carbon::createFromFormat('Y-m-d H:i', $task->date . ' ' . $task->end_time, $task->timezone)->format(DateTime::RFC3339),
                'timeZone' => $task->timezone,
            ],
        ]);
    }
}
