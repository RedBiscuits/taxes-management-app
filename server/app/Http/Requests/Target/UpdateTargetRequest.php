<?php

namespace App\Http\Requests\Target;

use App\Models\Target;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTargetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('sanctum')->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'location_id' => ['integer', 'min:1', 'exists:locations,id'],
            'percentage' => ['numeric', 'min:0', 'max:100'],
            'month' => [
                'required',
                'string',
                Rule::unique('targets')->where(function ($query) {
                    return $query->where('location_id', $this->input('location_id'));
                }),
                function ($attribute, $value, $fail) {

                    $totalPercentage = Target::where(
                        'location_id',
                        $this->input('location_id')
                    )->sum('percentage');

                    if (
                        $totalPercentage + $this->input('percentage') > 100
                        || Target::where('location_id', $this->input('location_id'))->count() >= 12
                    ) {
                        $fail('The sum of percentages for this location cannot exceed 100 and the total number of entries for this location cannot exceed 12.');
                    }
                }
            ]
        ];
    }
}
