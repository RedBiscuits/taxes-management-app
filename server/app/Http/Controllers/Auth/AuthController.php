<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Http\Requests\Auth\UserLoginRequest;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(UserLoginRequest $request)
    {
        if (Auth::attempt([
            'phone' => $request->validated()['phone'],
            'password' => $request->validated()['password']
        ])) {
            $user = Auth::user()->load('admin', 'employee'); // Eager load admin and employee relationships

            $token = $user->createToken(env('TOKEN_NAME'))->plainTextToken;

            return $this->respondCreated([
                'user' => $user,
                'token' => $token,
            ]);
        }

        return $this->respondError(null, 'Login failed');
    }

    public function register(CreateUserRequest $request)
    {
        $user = Employee::create($request->validated());

        return $this->respondOk($user, 'User created successfully');
    }


    public function logout()
    {
        auth('sanctum')->user()->currentAccessToken()->delete();

        return $this->respondOk(null);
    }
}
