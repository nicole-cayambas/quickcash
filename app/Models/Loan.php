<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;


    protected $fillable = [
        'amount',
        'loan_date',
        'amortizations',
        'percentage',
        'total_interest_rate',
        
        // 'total_interest', // do we need this? this can be computed from the other fields
        // 'total_amount', // need? can be computed
        // 'monthly', // need? can be computed

        // 'status' //we can use Spatie for this. laterz
    ];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function account() {
        return $this->belongsTo(Account::class);
    }
}
