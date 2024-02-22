<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends User
{
    use HasFactory;

    protected $fillable = [
        'location',
        'device_id',
        'user_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
