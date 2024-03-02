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
            'day_id' => [
                'required', 'integer', 'min:1',
                function ($attribute, $value, $fail) {
                    $day = Day::findOrFail($value)->select('status')->first();

                    if (!$day->status) {
                        $fail('day is not open');
                    }
                },
            ],
            'location_id' => ['required', 'integer', 'min:1', 'exists:locations,id'],
        ];
    }
}
