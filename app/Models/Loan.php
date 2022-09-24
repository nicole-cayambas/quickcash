<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\ModelStatus\HasStatuses;


class Loan extends Model
{
    use HasFactory, HasStatuses;

    protected $table = 'loans';

    protected $fillable = [
        'amount',
        'loan_date',
        'amortizations',
        'percentage',
        'account_id'
    ];

    public function account() {
        return $this->belongsTo(Account::class);
    }
}
