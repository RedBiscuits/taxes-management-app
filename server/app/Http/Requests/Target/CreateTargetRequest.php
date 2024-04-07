<?php

namespace App\Http\Requests\Target;

use App\Models\Target;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTargetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this this.
     */
    public function authorize(): bool
    {
        return auth('sanctum')->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the this.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'location_id' => ['required', 'integer', 'min:1', 'exists:locations,id'],
            'total' => ['required', 'numeric', 'min:0.01'],
            'january' => ['required', 'numeric', 'min:1'],
            'february' => ['required', 'numeric', 'min:1'],
            'march' => ['required', 'numeric', 'min:1'],
            'april' => ['required', 'numeric', 'min:1'],
            'may' => ['required', 'numeric', 'min:1'],
            'june' => ['required', 'numeric', 'min:1'],
            'july' => ['required', 'numeric', 'min:1'],
            'august' => ['required', 'numeric', 'min:1'],
            'september' => ['required', 'numeric', 'min:1'],
            'october' => ['required', 'numeric', 'min:1'],
            'november' => ['required', 'numeric', 'min:1'],
            'december' => ['required', 'numeric', 'min:1'],
            'total_percentage' => [
                "required",
                function ($attribute, $value, $fail) {

                    $months = $this->only(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']);
                    $totalPercentage = array_sum($months);
                    if ($totalPercentage !== 100) {
                        $fail('The sum of percentages for all months must be 100.');
                    }
                },
            ]

        ];
    }
}


// 'month' => [
//     'required',
//     'string',
//     Rule::unique('targets')->where(function ($query) {
//         return $query->where('location_id', $this->input('location_id'));
//     }),
//     function ($attribute, $value, $fail) {

//         $totalPercentage = Target::where(
//             'location_id',
//             $this->input('location_id')
//         )->sum('percentage');

//         if (
//             $totalPercentage + $this->input('percentage') > 100
//             || Target::where('location_id', $this->input('location_id'))->count() >= 12
//         ) {
//             $fail('The sum of percentages for this location cannot exceed 100 and the total number of entries for this location cannot exceed 12.');
//         }
//     }
// ]