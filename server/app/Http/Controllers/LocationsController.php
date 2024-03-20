<?php

namespace App\Http\Controllers;

use App\Http\Requests\Location\CreateLocationRequest;
use App\Http\Requests\Location\UpdateLocationRequest;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function index()
    {
        $locations = Location::query()
            ->when(request('name'), function ($query, $search) {
                $query->where('name', 'like', "$search%");
            })
            ->when(request('yearly_target'), function ($query, $search) {
                $query->where('yearly_target', 'like', "$search%");
            })
            ->when(request('status'), function ($query, $search) {
                $query->where('status', 'like', $search);
            })
            ->when(request('user_id'), function ($query, $search) {
                $query->where('user_id', 'like', $search);
            })->with(
                ['targets', 'receipts', 'days']
            )
            ->paginate();

        return $this->respondOk($locations);
    }

    public function show(Location $location)
    {
        return $this->respondOk(
            $location->load(
                ['targets', 'receipts', 'days']
            )
        );
    }

    public function store(CreateLocationRequest $request)
    {
        return $this->respondCreated(
            Location::create(
                $request->validated()
            )
        );
    }

    public function update(UpdateLocationRequest $request, Location $location)
    {
        $location->update($request->validated());
        return $this->respondOk($location);
    }

    public function destroy(Location $location)
    {
        $location->delete();
        return $this->respondNoContent();
    }
}
