<?php

namespace App\Http\Requests\Payments;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('sanctum')->check() && (
            auth('sanctum')->user()->hasRole('admin')
            || auth('sanctum')->user()->id === $this->route('payment')->user_id
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => ['numeric', 'min:0'],
            'close_date' => ['date'],
            'phone' => ['string', 'exists:users,phone'],
        ];
    }
}
