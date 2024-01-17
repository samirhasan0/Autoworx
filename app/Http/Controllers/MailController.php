<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public static function send($to, $subject, $message)
    {
        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)->subject($subject);
        });
    }
}
