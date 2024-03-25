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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('invoice_id');
            $table->integer('customer_id');
            $table->integer('vehicle_id');
            $table->json('service_ids');
            $table->string('photo')->nullable();
            $table->decimal('subtotal', 8, 2);
            $table->decimal('discount', 8, 2);
            $table->decimal('tax', 8, 2);
            $table->decimal('grand_total', 8, 2);
            $table->decimal('deposit', 8, 2);
            $table->decimal('due', 8, 2);
            $table->enum('status', ['Delivered', 'Consultations', 'Confirmed', 'In Progress', 'Follow Up', 'Scheduled', 'Pending', 'No show', 'Cancelled']);
            $table->boolean('send_mail')->default(false);
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();
            $table->text('policy')->nullable();
            $table->date('issue_date')->default(now());
            $table->text('salesperson');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
