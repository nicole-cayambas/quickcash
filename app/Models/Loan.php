<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\ModelStatus\HasStatuses;


class Loan extends Model
{
    use HasFactory, HasStatuses;


    protected $fillable = [
        'amount',
        'loan_date',
        'amortizations',
        'percentage',
        'total_interest_rate',
        'company_id',
        'account_id',
    ];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function account() {
        return $this->belongsTo(Account::class);
    }
}
