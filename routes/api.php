<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\LoanController_Payroll;
use App\Http\Controllers\LoanController_Employee;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ReceivableController;
use App\Http\Controllers\AuthController;


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user', function (Request $request) { 
        $user = $request->user();
        $user->role = $user->getRoleNames()->first();
        return $user; 
    });
    Route::get('user/role', function (Request $request) { 
        return $request->user()->getRoleNames()->first();
    });
    Route::get('user/account', function (Request $request) {
        return $request->user()->account;
    });

    Route::get('loans/{id}/status', function($id){
        $loan = App\Models\Loan::findOrFail($id);
        return $loan->status();
    });
    
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('companies', [CompanyController::class, 'index']);
    Route::get('companies/{id}', [CompanyController::class, 'show']); // no frontend

    Route::group(['middleware' => ['role:Owner|Administrator|Payroll_Officer']], function () {
        // EMPLOYEE ROUTES
        Route::resource('employees', EmployeeController::class);
        Route::put('employees/{id}/resetPassword', [EmployeeController::class, 'resetPassword']); // TODO


        // ACCOUNT ROUTES
        Route::get('accounts', [AccountController::class, 'index']);
        Route::get('accounts/{id}', [AccountController::class, 'show']);
    });


    Route::group(['middleware' => ['role:Owner|Administrator']], function () {
        // LOAN ROUTES
        Route::resource('loans', LoanController::class);

        // COMPANY ROUTES
        Route::post('companies', [CompanyController::class, 'store']);
        Route::put('companies/{id}', [CompanyController::class, 'update']);
        Route::delete('companies/{id}', [CompanyController::class, 'destroy']);

        // ACCOUNT ROUTES
        Route::put('accounts/{id}', [AccountController::class, 'update']);
        Route::delete('accounts/{id}', [AccountController::class, 'destroy']);

        // RECEIVABLE ROUTES
        Route::get('receivables', [ReceivableController::class, 'index']); // TODO

    });

    Route::group(['middleware' => 'role:Administrator'], function () {
        // PAYROLL ROUTES
        Route::resource('payrolls', PayrollController::class);
        Route::put('payrolls/{id}/resetPassword', [PayrollController::class, 'resetPassword']); // TODO
    });

    Route::group(['middleware' => 'role:Payroll_Officer'], function () {
        Route::get('payroll/loans', [LoanController_Payroll::class, 'index']);
        Route::get('payroll/loans/{id}', [LoanController_Payroll::class, 'show']);
        Route::post('payroll/loans', [LoanController_Payroll::class, 'store']);
        Route::put('payroll/loans/{id}', [LoanController_Payroll::class, 'update']);

        Route::put('employees/{id}/verify', [EmployeeController::class, 'verify']);
        Route::put('employees/{id}/deactivate', [EmployeeController::class, 'deactivate']);
    });
    
    Route::group(['middleware' => 'role:Employee'], function () {
        Route::get('employee/loans', [LoanController_Employee::class, 'index']); 
        Route::get('employee/loans/{id}', [LoanController_Employee::class, 'show']);
        Route::post('employee/loans', [LoanController_Employee::class, 'store']);

        Route::get('account', [AccountController::class, 'showOne']);
        Route::post('account/apply', [AccountController::class, 'store']);
    });
    
});

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register']);