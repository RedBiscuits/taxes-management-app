<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Http\Requests\Auth\UserLoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(UserLoginRequest $request)
    {

        if (Auth::attempt([
            'phone' => $request->validated()['phone'],
            'password' => $request->validated()['password'],
        ])) {

            $user = Auth::user();

            if ($user->hasRole('employee')) {
                if ($user->device_id && $request->validated()['device_id'] !== $user->device_id) {
                    return $this->respondError(null, 'Access from this device not allowed.');
                } else {
                    $user->update([
                        'device_id' => $request->validated()['device_id'],
                        'password' => $request->validated()['new_password'],
                    ]);
                }
            }
            $token = $user->createToken(env('TOKEN_NAME'))->plainTextToken;

            $user->load('location');

            return $this->respondCreated([
                'user' => $user,
                'token' => $token,
            ]);
        }

        return $this->respondError(null, 'Login failed');
    }

    public function register(CreateUserRequest $request)
    {
        $user = User::create($request->validated());
        $user->assignRole('employee');
        return $this->respondOk($user, 'User created successfully');
    }


    public function logout()
    {
        auth('sanctum')->user()->currentAccessToken()->delete();

        return $this->respondOk(null);
    }
}
