<?php

namespace App\Http\Requests\Entry;

use App\Models\Receipt;
use Illuminate\Foundation\Http\FormRequest;

class CreateEntryRequest extends FormRequest
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
            'entries' => ['required', 'array', 'min:1'],
            'entries.*.value' => ['required', 'numeric', 'min:0'],
            'entries.*.tax_type' => ['required', 'string'],
            'entries.*.payment_type' => ['required', 'string'],
            'entries.*.receipt_id' => [
                'required', 'integer', 'min:1',
                function ($attribute, $value, $fail) {
                    $receipt = Receipt::findOrFail($value);
                    if (!$receipt->day->status && !auth('sanctum')->user()->hasRole('admin')) {
                        $fail('The day associated with the receipt is not open.');
                    }
                },
            ],
        ];
    }
}
