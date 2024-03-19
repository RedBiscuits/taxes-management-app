<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'phone',
        'is_paid',
        'close_date',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'is_paid' => 'boolean',
        'close_date' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePhone($query, $phone)
    {
        return $query->where('phone', 'like', "$phone%");
    }

    public function scopeIsPaid($query, $isPaid)
    {
        return $query->where('is_paid', 'like', $isPaid);
    }

    public function scopeAmount($query, $amount)
    {
        return $query->where('amount', 'like', "$amount%");
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', 'like', $status);
    }

    public function scopeUserId($query, $userId)
    {
        return $query->where('user_id', 'like', $userId);
    }

    public function scopeLocationId($query, $locationId)
    {
        return $query->where('location_id', 'like', $locationId);
    }

    public function scopeCreatedAt($query, $operator, $date)
    {
        return $query->whereDate('created_at', $operator, $date);
    }

    public function scopeCloseDate($query, $operator, $date)
    {
        return $query->whereDate('close_date', $operator, $date);
    }
}
