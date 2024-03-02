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

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }
}
