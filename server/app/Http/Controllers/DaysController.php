<?php

namespace App\Http\Controllers;

use App\Http\Requests\Days\CreateDayRequest;
use App\Http\Requests\Days\UpdateDayRequest;
use App\Models\Day;
use Illuminate\Http\Request;

class DaysController extends Controller
{
    public function index()
    {
        $days = Day::query()
            ->when(request('time'), function ($query, $search) {
                $query->where('time', 'like', "$search%");
            })
            ->when(request('start_date'), function ($query, $search) {
                $query->where('start_date', 'like', "$search%");
            })
            ->when(request('end_date'), function ($query, $search) {
                $query->where('end_date', 'like', "$search%");
            })
            ->when(request('name'), function ($query, $search) {
                $query->where('name', 'like', "$search%");
            })
            ->when(request('location_id'), function ($query, $search) {
                $query->where('location_id', 'like', $search);
            })
            ->where(function ($query) {
                $query->whereNull('status')
                    ->orWhere('status', 1);
            })
            ->paginate();

        return $this->respondOk($days);
    }

    public function show(Day $day)
    {
        return $this->respondOk($day);
    }

    public function store(CreateDayRequest $request)
    {
        return $this->respondCreated(Day::create($request->validated()));
    }

    public function update(UpdateDayRequest $request, Day $day)
    {
        $day->update($request->validated());
        return $this->respondOk($day);
    }

    public function destroy(Day $day)
    {
        $day->delete();
        return $this->respondNoContent();
    }

    public function open(Day $day)
    {
        if($day->status == 0) {
            return $this->respondError('day is already open');
        }

        $day->update(['status' => 1]);

        return $this->respondOk($day);
    }

    public function close(Day $day)
    {
        $day->update(['status' => 0]);

        return $this->respondOk($day);
    }
}
