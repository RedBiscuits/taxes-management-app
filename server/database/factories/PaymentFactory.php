<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "amount" => fake()->numberBetween(1000, 100000),
            "phone" => fake()->regexify("^01[0125]\d{8}$"),
            "close_date" => fake()->optional()->dateTime(),
        ];
    }
}
