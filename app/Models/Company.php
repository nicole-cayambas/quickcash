<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'website',
        'logo'
    ];

    public function user() {
        return $this->hasMany(User::class);
    }

    public function account() {
        return $this->hasMany(Account::class);
    }

    public function loans() {
        return $this->hasMany(Loan::class);
    }

    public function employee() {
        return $this->hasMany(Employee::class);
    }
    
}
