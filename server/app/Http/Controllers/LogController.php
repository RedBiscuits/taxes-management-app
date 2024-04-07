<?php

namespace App\Http\Controllers;

use App\Http\Requests\Logs\CreateLogRequest;
use App\Http\Requests\Logs\UpdateLogRequest;
use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->respondOk(Log::query()->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateLogRequest $request)
    {
        return $this->respondCreated(Log::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Log $log)
    {
        return $this->respondOk($log);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLogRequest $request, Log $log)
    {
        $log->update($request->validated());
        return $this->respondOk($log);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Log $log)
    {
        $log->delete();
        return $this->respondOk($log);
    }
}
