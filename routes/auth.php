<?php

use App\Http\Controllers\CalendlyController;
use App\Http\Controllers\GoogleCalendarController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Models\OauthToken;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;

Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');

    // Redirect to Google OAuth2 consent screen
    Route::get(
        '/redirect-to-google',
        [AuthenticatedSessionController::class, 'redirectToGoogle']
    )->name('auth.google');

    // Handle Google OAuth2 callback
    Route::get(
        '/auth/google/callback',
        [AuthenticatedSessionController::class, 'handleGoogleCallback']
    );
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Redirect to Google OAuth2 consent screen
    Route::get(
        '/redirect-to-google-calendar',
        [GoogleCalendarController::class, 'redirectOauth']
    )->name('auth.google.calendar');

    // Handle Google Calendar OAuth2 callback
    Route::get('/auth/google/callback-calendar', [GoogleCalendarController::class, 'handleOauth']);

    // Redirect to Calendly OAuth2 consent screen
    Route::get('/redirect-to-calendly', [CalendlyController::class, 'redirectOauth'])->name('auth.calendly');

    // Handle Calendly OAuth2 callback
    Route::get('/auth/calendly/callback', [CalendlyController::class, 'handleOauth']);
});
