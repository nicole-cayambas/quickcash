<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\AccountSeeder;
use Database\Seeders\CompanySeeder;
use Database\Seeders\LoanSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt('secret'),
        // ]);

        \App\Models\Loan::factory()->count(10)->create([
            'company_id' => fake()->numberBetween(1, 10),
            'account_id' => fake()->numberBetween(1, 10),
            'amount' => fake()->numberBetween(10000, 20000),
            'amortizations' => fake()->numberBetween(1, 10),
            'percentage' => fake()->numberBetween(1, 10),
            'total_interest_rate' => fake()->numberBetween(1, 10),
        ]);

        // $this->call([
        //     AccountSeeder::class,
        //     CompanySeeder::class,
        //     LoanSeeder::class,
        // ]);
    }
}
