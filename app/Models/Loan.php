<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount' => 'required, numeric',
        // 'loan_date' => 'required, datetime', //I think we can use created_at for this
        'amortizations' => 'required, double',
        'percentage' => 'required, double',
        'total_interest_rate' => 'required, double',
        'total_interest' => 'required, double', //to continue

    ];
}
