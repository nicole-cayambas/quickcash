<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'user_id',
        'name',
        'company_id',
        'balance',
        'address',
        'phone'
        // 'capital', // move to company
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function loans() {
        return $this->hasMany(Loan::class);
    }

    // public function bank
}
