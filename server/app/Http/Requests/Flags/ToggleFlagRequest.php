<?php

namespace App\Http\Requests\Flags;

use Illuminate\Foundation\Http\FormRequest;

class ToggleFlagRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth('sanctum')->user();
        return $user
            && $user->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'feature_name' => 'required|string|in:receipts_active,payments_active,targets_active',
            'value' => 'required|boolean',
        ];
    }
}
