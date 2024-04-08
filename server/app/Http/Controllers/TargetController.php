<?php

namespace App\Http\Controllers;

use App\Http\Requests\Target\CreateTargetRequest;
use App\Http\Requests\Target\UpdateTargetRequest;
use App\Http\Requests\Target\ViewTargetRequest;
use App\Models\Target;
use Illuminate\Http\Request;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ViewTargetRequest $request)
    {
        // return $this->respondOk(Target::query()
        //     ->when(request()->has('location_id'), function ($query, $search) {
        //         $query->where('location_id', '=', $search);
        //     })
        //     ->with(['location'])
        //     ->first());

        return $this->respondOk(Target::where('location_id', request('location_id'))->with("location")->first());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTargetRequest $request)
    {
        return $this->respondCreated(
            Target::create(
                $request->validated()
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ViewTargetRequest $request, Target $target)
    {
        return $this->respondOk(
            $target->load(['location'])
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTargetRequest $request, Target $target)
    {
        $target->update($request->validated());
        return $this->respondOk($target);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Target $target)
    {
        $target->delete();
        return $this->respondNoContent();
    }
}
