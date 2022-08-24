<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'account_id' => $this->faker->numberBetween(1, 10),
            'amount' => $this->faker->numberBetween(1000, 20000),
            'loan_date' => $this->faker->dateTimeBetween('-1 years', '+1 years'),
            'amortizations' => $this->faker->randomElement([3,6,9]),
            'percentage' => $this->faker->numberBetween(1, 100),
        ];
    }
}
