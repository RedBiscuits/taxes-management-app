<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'yearly_target',
        'user_id',
        'name',
    ];
    protected $appends = ['yearly_receipts'];

    public function getMonthlyTargetAttribute()
    {
        return $this->yearly_target / 12;
    }


    public function getYearlyReceiptsAttribute()
    {
        // Ensure days and receipts relationships are defined
        if (!$this->relationLoaded('days')) {
            $this->load('days');
        }
        if (!$this->relationLoaded('days.receipts')) {
            $this->load('days.receipts');
        }

        $days = $this->days->mapWithKeys(function ($day) {
            $date = Carbon::parse($day->date);
            return [$date->year . '-' . $date->month => $day->receipts->sum('total')];
        });

        return $days->groupBy('year')->map(function ($months) {
            return $months->merge(['year_total' => $months->sum()]);
        })->toArray();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function days()
    {
        return $this->hasMany(Day::class);
    }

    public function receipts()
    {
        return $this->hasMany(Receipt::class);
    }
}
