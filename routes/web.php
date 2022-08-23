<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\LoanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('payroll/loans/test', function (Request $request) {

    $user = App\Models\User::find(3);
    $accountIDs = $user->company->accounts()->pluck('id');
    $loans = App\Models\Loan::whereIn('account_id', $accountIDs)->get();
    $loans = $loans->groupBy('account_id');
    return response()->json(gettype($loans), 200);
});

Route::get('loans/{id}/status', function($id){
    $loan = App\Models\Loan::findOrFail($id);
    return $loan->status();
});


Route::any('/{any}', function(){
    return view('main');
})->where('any', '.*');

