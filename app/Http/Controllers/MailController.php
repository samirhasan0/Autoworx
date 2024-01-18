<?php

namespace App\Http\Controllers;

use Webklex\IMAP\Facades\Client;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public static function send($to, $subject, $message)
    {
        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)->subject($subject);
        });
    }

    // Get all messages from an email (inbox and sent)
    public static function get($email)
    {
        $client = Client::account('default');
        $client->connect();

        // Get messages from INBOX
        $inboxFolder = $client->getFolder('INBOX');
        $inboxMessages = $inboxFolder->query()->from($email)->get();

        // Get messages from Sent folder
        $sentFolder = $client->getFolder('[Gmail]/Sent Mail');
        $sentMessages = $sentFolder->query()->to($email)->get();

        // Combine inbox and sent messages
        $allMessages = array_merge($inboxMessages->toArray(), $sentMessages->toArray());

        $emailMessages = [];

        // Process all messages
        foreach ($allMessages as $message) {

            $body = $message->getTextBody();
            $body = explode("\r\n", $body)[0];
            $date = $message->getDate()->first();
            $emailMessages[] = [
                "sender" => $message->getFrom()->first()->mail == $email ? "client" : "user",
                "message" => $body,
                "date" => $date->timestamp, // Get the timestamp of the message
            ];
        }

        // Sort the messages by date
        usort($emailMessages, function ($a, $b) {
            return $a['date'] - $b['date'];
        });

        return $emailMessages;
    }
}
