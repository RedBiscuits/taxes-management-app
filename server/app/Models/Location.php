<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'yearly_target',
        'employee_id',
        'name',
        'status',
    ];

    public function getMonthlyTargetAttribute()
    {
        return $this->yearly_target / 12;
    }
    public function getStatusAttribute($value)
    {
        return $value ? 'opened' : 'closed';
    }

    public function getYearlyReceiptsAttribute()
    {
        $yearlyReceipts = Day::with('receipts') // Eager load the 'receipts' relationship
            ->selectRaw('YEAR(time) as year, MONTH(time) as month, SUM(total) as monthly_total')
            ->where('location_id', $this->location_id)
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->groupBy('year')
            ->map(function ($yearlyReceipts) {
                return [
                    'months' => $yearlyReceipts->mapWithKeys(function ($monthlyReceipt) {
                        return [$monthlyReceipt['month'] => $monthlyReceipt['monthly_total']];
                    })->all(),
                    'total' => $yearlyReceipts->sum('monthly_total')
                ];
            });

        return $yearlyReceipts->toArray();
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
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
