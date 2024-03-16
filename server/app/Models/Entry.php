<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'tax_type',
        'payment_type',
        'receipt_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($entry) {
            $entry->receipt->increment('total', floatval($entry->value));
        });
    }

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }
}
