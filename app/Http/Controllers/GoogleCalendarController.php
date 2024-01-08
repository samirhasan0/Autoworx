<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OauthToken;
use App\Models\Task;
use App\Models\User;
use Google_Client;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;

class GoogleCalendarController extends Controller
{
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

    private static function storeEvents($events, $user)
    {
        foreach ($events as $event) {
            $startDateTime = Carbon::parse($event->start->dateTime);
            $endDateTime = Carbon::parse($event->end->dateTime);

            // Update or create a task for each event
            Task::updateOrCreate(
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
        }
    }

    // Create an event in the user's Google Calendar
    public static function createEvent(Task $task)
    {
        $user = Auth::user();
        $token = self::getUserToken($user);

        // If user has not connected to google calendar, do nothing
        if (!$token) return;

        $client = self::initializeGoogleClient();
        $client->setAccessToken($token);
        $service = new Google_Service_Calendar($client);

        // Create the event object
        $event = self::getGoogleCalendarEvent($task, $user);

        // Add the event to the user's primary calendar
        $service->events->insert('primary', $event);
    }

    // Get the user's google oauth2 token
    public static function getUserToken($user)
    {
        return OauthToken::where('user_id', $user->id)->where('provider', 'google')->first();
    }

    // Initialize the Google Client with secret keys and user's token
    public static function initializeGoogleClient()
    {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_CALLBACK'));


        return $client;
    }


    // Get the Google Calendar event object
    public static function getGoogleCalendarEvent($task, $user)
    {
        return new Google_Service_Calendar_Event([
            'summary' => $task->title,
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
