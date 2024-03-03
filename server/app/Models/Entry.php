<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'type',
        'receipt_id',
    ];

    protected static function boot()
    {
        parent::boot();

        // Listen for the 'created' event
        static::created(function ($entry) {
            // Increment the receipt's total value by the new entry's value
            $entry->receipt->increment('total', $entry->value);
        });
    }

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }
}
