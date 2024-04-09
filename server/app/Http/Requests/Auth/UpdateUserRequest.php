<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth('sanctum')->user();
        return $user->hasRole('admin')
            || $user->id === $this->route('user')->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'password' => ['string', 'min:8'],
            'password_confirmation' => ['string', 'same:password'],
            'job' => [Rule::in(['employee', 'manager'])],
            'location_id' => ['integer', 'min:1', 'exists:locations,id'],
            'role' => ['string', 'in:employee,manager'],

        ];
    }
}
