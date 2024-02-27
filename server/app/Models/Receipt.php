<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'day_id',
        'amount',
        'total',
    ];

    public function day()
    {
        return $this->belongsTo(Day::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function entries()
    {
        return $this->hasMany(Entry::class);
    }
}
