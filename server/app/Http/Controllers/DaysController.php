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
        $Days = Day::query()
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

        return $this->respondOk($Days);
    }

    public function show(Day $Day)
    {
        return $this->respondOk($Day);
    }

    public function store(CreateDayRequest $request)
    {
        return $this->respondCreated(Day::create($request->validated()));
    }

    public function update(UpdateDayRequest $request, Day $Day)
    {
        $Day->update($request->validated());
        return $this->respondOk($Day);
    }

    public function destroy(Day $Day)
    {
        $Day->delete();
        return $this->respondNoContent();
    }
}
