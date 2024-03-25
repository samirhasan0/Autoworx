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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('image')->default('/images/default.png');
            $table->string('password');
            $table->enum('provider', ['google', 'apple', 'email'])->default('email');
            $table->string('timezone')->default('UTC');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            // TODO: probably need to improve this
            $table->enum('role', ['admin', 'employee'])->default('admin');
            $table->enum('employee_type', ['Salary', 'Hourly', 'Contract Based', 'None'])->default('None');
            $table->enum('employee_department', [
                'Sales', 'Management', 'Workshop', 'None'
            ])->default('None');
            $table->string('work_order_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
