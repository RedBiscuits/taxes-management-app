<?php

namespace App\Http\Requests\Receipt;

use App\Models\Day;
use Illuminate\Foundation\Http\FormRequest;

class CreateReceiptRequest extends FormRequest
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
            'day_id' => [
                'required', 'integer', 'min:1',
                function ($attribute, $value, $fail) {
                    $day = Day::find($value);

                    if (!$day) {
                        $fail('Invalid day selected.');
                        return;
                    }

                    if ($day->status == 0) {
                        $fail('The selected day is not open.');
                    }
                },
            ],
            'location_id' => ['required', 'integer', 'min:1', 'exists:locations,id'],
        ];
    }
}
