<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\GoogleCalendarController;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use App\Models\OauthToken;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Redirect to login with Google   
     * Grant Calendar API access with personal Google account
     */
    public function redirectToGoogle(): RedirectResponse
    {
        // initialize google client
        $googleClient = GoogleCalendarController::initializeGoogleClient(env('GOOGLE_REDIRECT_CALLBACK'));
        // scope for calendar events
        $googleClient->addScope('https://www.googleapis.com/auth/calendar.events');
        // scope for user info
        $googleClient->addScope('https://www.googleapis.com/auth/userinfo.profile');
        // scope for user email
        $googleClient->addScope('https://www.googleapis.com/auth/userinfo.email');
        $googleClient->setAccessType('offline');
        $googleClient->setPrompt('consent');

        // get auth url
        $authUrl = $googleClient->createAuthUrl();

        // redirect to auth url
        return redirect($authUrl);
    }

    /**
     * Handle Google OAuth2 callback    
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        // initialize google client
        $googleClient = GoogleCalendarController::initializeGoogleClient(env('GOOGLE_REDIRECT_CALLBACK'));
        // request access and refresh token
        $googleToken = $googleClient->fetchAccessTokenWithAuthCode(request()->code);

        // get user
        $oAuth2 = new \Google_Service_Oauth2($googleClient);
        $userInfo = $oAuth2->userinfo->get();

        // check if user exists
        // if not, create user
        $user = User::firstOrCreate(
            ['email' => $userInfo->email],
            [
                'name' => $userInfo->name,
                'password' => Hash::make(Str::random(24)),
                'provider' => 'google',
                'image' => $userInfo->picture,
            ]
        );

        // login user
        Auth::login($user, true);

        // store user token
        GoogleCalendarController::storeUserToken($googleToken);
        // get events and store
        GoogleCalendarController::getEventsAndStore();

        // redirect to home
        return redirect(RouteServiceProvider::HOME);
    }
}
