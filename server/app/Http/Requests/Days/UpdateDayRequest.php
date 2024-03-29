<?php

namespace App\Http\Requests\Days;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDayRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('sanctum')->user()->hasAnyRole(['admin', 'employee']);
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
            'time' => ['date'],
            'start_date' => ['date'],
            'end_date' => ['date'],
            'location_id' => ['integer', 'min:1', 'exists:locations,id'],

        ];
    }
}
