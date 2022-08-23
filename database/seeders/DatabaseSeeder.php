<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\AccountFactory;
use Database\Factories\CompanyFactory;
use Database\Factories\LoanFactory;
use App\Models\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $user1 = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'password' => bcrypt('secret'),
        ]);
        $user2 = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test2@example.com',
            'password' => bcrypt('secret'),
        ]);
        $user3 = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test3@example.com',
            'password' => bcrypt('secret'),
        ]);
        $user4 = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test4@example.com',
            'password' => bcrypt('secret'),
        ]);

        AccountFactory::new()->count(10)->create();
        CompanyFactory::new()->count(10)->create();
        LoanFactory::new()->count(10)->create();
        
        $this->call(RoleAndPermissionSeeder::class);
        $user1->assignRole('Owner');
        $user2->assignRole('Administrator');
        $user3->assignRole('Payroll_Officer');
        $user4->assignRole('Employee');

        $this->call(StatusSeeder::class);
    }
}