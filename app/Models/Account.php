<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    

    protected $fillable = [
        // 'acc_number', /* how to implement this? we should use this as an ID. We can use not fillable, just writing it down */
        // 'user_id' // FOREIGN KEY 1. not fillable, just writing it down for later
        'balance',
        'capital',
        //what else? look it up
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function loan() {
        return $this->hasMany(Loan::class);
    }
}
