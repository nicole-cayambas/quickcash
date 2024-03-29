<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\ModelStatus\Status;
use App\Models\Loan;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['name' => 'Pending'],
            ['name' => 'Approved'],
            ['name' => 'Acknowledged'],
            ['name' => 'Rejected'],
            ['name' => 'Cancelled'],
            ['name' => 'Completed'],
            ['name' => 'New'], // for loaners who are at their first loan
            ['name' => 'Active'],
            ['name' => 'Deactivated']
        ];
        foreach ($statuses as $status) {
            Status::create($status);
        }
    }
}
