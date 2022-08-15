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
            'company_id' => $this->faker->numberBetween(1, 10),
            'amount' => $this->faker->numberBetween(100, 1000),
            'loan_date' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'amortizations' => $this->faker->numberBetween(1, 12),
            'percentage' => $this->faker->numberBetween(1, 100),
            'total_interest_rate' => $this->faker->numberBetween(1, 100),
        ];
    }
}
