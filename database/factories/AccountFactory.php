<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // 'name' => $this->faker->name,
            'user_id' => $this->faker->numberBetween(1, 10),
            'company_id' => $this->faker->numberBetween(1, 10),
            'balance' => $this->faker->numberBetween(100, 1000),
            'capital' => $this->faker->numberBetween(100, 1000),
        ];
    }
}
