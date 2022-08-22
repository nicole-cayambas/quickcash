<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'capital',
        'address',
        'phone',
        'email',
        'website',
        'logo'
    ];

    // maybe oks na ang acc
    public function users() {
        return $this->hasMany(User::role('Payroll_Officer'));
    }

    public function accounts() {
        return $this->hasMany(Account::class);
    }
    
}
