<?php

namespace App\Http\Controllers;

use App\Models\OauthToken;
use App\Models\Task;
use GuzzleHttp\Client;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendlyController extends Controller
{
    // Redirect to Calendly OAuth2 consent screen
    public static function redirectOauth()
    {
        return redirect()->away(
            'https://auth.calendly.com/oauth/authorize?response_type=code&client_id=' . env('CALENDLY_CLIENT_ID') . '&redirect_uri=' . env('CALENDLY_REDIRECT_CALLBACK')
        );
    }

    // Handle Calendly OAuth2 callback
    public static function handleOauth(Request $request)
    {
        // Get access token
        $token = self::getAccessToken($request->code);
        $user = Auth::user();

        // Save token to database
        OauthToken::updateOrCreate(
            ['user_id' => $user->id, 'provider' => 'calendly'],
            [
                'access_token' => $token['access_token'],
                'refresh_token' => $token['refresh_token'],
                'expires_in' => now()->addSeconds($token['expires_in']),
            ]
        );

        // Get events
        $events = self::getEvents($token);

        // Save events to database
        foreach ($events['collection'] as $event) {
            Task::updateOrCreate(
                ['user_id' => $user->id, 'title' => $event['name'], 'date' => date('Y-m-d', strtotime($event['start_time']))],
                [
                    'user_id' => $user->id,
                    'title' => $event['name'],
                    'date' =>
                    date('Y-m-d', strtotime($event['start_time'])),
                    'start_time' => $event['start_time'],
                    'end_time' => $event['end_time'],
                    'type' => 'event',
                    'timezone' => '',
                    'assigned_users' => $user->id,

                ]
            );
        }

        return redirect(RouteServiceProvider::HOME);
    }

    // Get the Calendly access token
    public static function getAccessToken($code)
    {
        $client = new Client();
        $response = $client->post('https://auth.calendly.com/oauth/token', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => env('CALENDLY_CLIENT_ID'),
                'client_secret' => env('CALENDLY_CLIENT_SECRET'),
                'code' => $code,
                'redirect_uri' => env('CALENDLY_REDIRECT_CALLBACK'),
            ],
        ]);

        $calendlyToken = json_decode((string) $response->getBody(), true);

        return $calendlyToken;
    }

    // Get all events from Calendly
    public static function getEvents($token)
    {
        $client = new Client([
            'headers' => [
                'Authorization' => 'Bearer ' . $token['access_token'],
            ],
        ]);

        $response = $client->get('https://api.calendly.com/scheduled_events?user=' . $token['owner']);

        $events = json_decode((string) $response->getBody(), true);

        return $events;
    }
}
