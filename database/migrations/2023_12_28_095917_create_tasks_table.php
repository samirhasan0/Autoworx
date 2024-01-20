<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title', 100);
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            // type: event, appointment, task
            $table->enum('type', ['event', 'appointment', 'task']);
            // assigned_users
            $table->string('assigned_users', 100);
            $table->string('timezone', 100);
            $table->string('google_calendar_event_id', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
