<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    use HasFactory;

    protected $fillable = [
        'time',
        'start_date',
        'end_date',
        'name',
        'location_id'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function receipts()
    {
        return $this->hasMany(Receipt::class);
    }
}
