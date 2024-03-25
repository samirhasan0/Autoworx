<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'type',
        'method',
        'amount',
        'note',
        'date',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
