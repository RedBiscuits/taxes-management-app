<?php

namespace App\Http\Controllers;

use App\Http\Requests\Day\CreateDayRequest;
use App\Http\Requests\Day\UpdateDayRequest;
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
        $day->status = 1;
        $day->save();
        return $this->respondOk($day);
    }

    public function close(Day $day)
    {
        $day->status = 0;
        $day->save();
        return $this->respondOk($day);
    }
}