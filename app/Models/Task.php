<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    use HasFactory;

    public const TYPES = [
        "task",
        "appointment",
        "event",
    ];


    protected $fillable = [
        'title',
        'date',
        'start_time',
        'end_time',
        'type',
        'user_id',
        "assigned_users",
        "timezone"
    ];




    // make relationship with user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
