<?php

namespace App\Http\Middleware;

use App\Models\OauthToken;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class ShareInertiaData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user has connected their Google Calendar
        $hasGoogleCalendar = OauthToken::where('user_id', Auth::id())
            ->where('provider', 'google')
            ->exists();


        // Share the data with all Inertia views
        Inertia::share([
            'hasGoogleCalendar' => $hasGoogleCalendar,
        ]);

        return $next($request);
    }
}
