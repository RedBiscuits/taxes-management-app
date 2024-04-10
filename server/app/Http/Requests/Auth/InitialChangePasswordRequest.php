<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class InitialChangePasswordRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'phone' => 'required|string|exists:users,phone',
      'password' => 'required|min:8',
      'device_id' => 'required|string',
      'new_password' => 'required|min:8',
      'new_password_confirmation' => 'required|min:8|same:new_password',
    ];
  }
}
