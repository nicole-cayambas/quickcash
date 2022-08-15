<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\AccountFactory;
use Database\Factories\CompanyFactory;
use Database\Factories\LoanFactory;
use Database\Factories\UserFactory;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        UserFactory::new()->count(1)->create();

        AccountFactory::new()->count(10)->create();
        CompanyFactory::new()->count(10)->create();
        LoanFactory::new()->count(10)->create();
    }
}