<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'percentage',
        'month'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
