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
        User::query()
            ->when('name', function ($query, $search) {
                $query->where('name', 'like', "$search%");
            })
            ->when('job', function ($query, $search) {
                $query->where('job', 'like', "$search%");
            })
            ->when('phone', function ($query, $search) {
                $query->where('phone', 'like', "$search%");
            })
            ->when('location_id', function ($query, $search) {
                $query->where('location_id', 'like', $search);
            })->paginate();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function update(UpdateUserRequest $request , User $user)
    {

        $user->update($request->validated());
        $user->syncRoles(array_merge([$user->defaultRole()], $request->role ?? []));
        return $this->respondOk($user);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $this->respondOk($user->load('location'));
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
