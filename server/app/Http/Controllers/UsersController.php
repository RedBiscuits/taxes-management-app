<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::query()
            ->when(request()->has('name'), function ($query, $search) {
                $query->where('name', 'like', "$search%");
            })
            ->when(request()->has('job'), function ($query, $search) {
                $query->where('job', 'like', "$search%");
            })
            ->when(request()->has('phone'), function ($query, $search) {
                $query->where('phone', 'like', "$search%");
            })
            ->when(request()->has('location_id'), function ($query, $search) {
                $query->where('location_id', 'like', $search);
            })
            ->with(['location', 'roles'])
            ->paginate();

        return $this->respondOk($users);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        $user->update($request->validated());
        $user->syncRoles([$request->role] ?? [$user->roles()->first()]);
        return $this->respondOk($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $this->respondOk($user->load(['location', 'roles']));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return $this->respondNoContent();
    }
}
