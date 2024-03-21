<?php

namespace App\Http\Requests\Payments;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (
            auth('sanctum')->user()->hasRole('admin')
            && auth('sanctum')->user()->location_id == $this->get('location_id')
        ) {
            $this->merge(['user_id' => auth('sanctum')->user()->id]);
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => ['required', 'numeric', 'min:0'],
            'phone' => ['required', 'string'],
            'user_id' => ['required', 'integer', 'min:1', 'exists:users,id'],
            'created_at' => ['date'],
        ];
    }
}
