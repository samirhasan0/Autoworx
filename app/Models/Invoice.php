<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'customer_id',
        'vehicle_id',
        'service_ids',
        'photo',
        'subtotal',
        'discount',
        'tax',
        'grand_total',
        'deposit',
        'due',
        'status',
        'send_mail',
        'notes',
        'terms',
        'policy',
        'issue_date',
        'salesperson',
        'company_id'
    ];
}
