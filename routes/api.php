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

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('companies', [CompanyController::class, 'index']);
    Route::get('companies/{id}', [CompanyController::class, 'show']);

    Route::group(['middleware' => 'role:Owner', 'role:Administrator'], function () {
        // LOAN ROUTES
        Route::resource('loans', LoanController::class);
        Route::put('owner/loans/{id}/acknowledge', [LoanController::class, 'acknowledge']); // TODO

        // COMPANY ROUTES
        Route::post('companies', [CompanyController::class, 'store']);
        Route::put('companies/{id}', [CompanyController::class, 'update']);
        Route::delete('companies/{id}', [CompanyController::class, 'destroy']);

        // EMPLOYEE ROUTES
        Route::resource('employees', EmployeeController::class);

        // ACCOUNT ROUTES
        Route::put('accounts/{id}', [AccountController::class, 'update']); // TODO

        // RECEIVABLE ROUTES
        Route::get('receivables', [ReceivableController::class, 'index']); // TODO

    });

    Route::group(['middleware' => 'role:Administrator'], function () {
        // PAYROLL ROUTES
        Route::resource('payrolls', PayrollController::class);
    });

    Route::group(['middleware' => 'role:Payroll_Officer'], function () {
        Route::get('payroll/loans', [LoanController_Payroll::class, 'index']);
        Route::get('payroll/loans/{id}', [LoanController_Payroll::class, 'show']);
        Route::put('payroll/loans/{id}', [LoanController_Payroll::class, 'update']);
        Route::delete('payroll/loans/{id}', [LoanController_Payroll::class, 'destroy']);

        // EMPLOYEE ROUTES
        Route::resource('employees', EmployeeController::class);
        Route::put('employees/{id}/verify', [EmployeeController::class, 'verify']);
        Route::put('employees/{id}/resetPassword', [EmployeeController::class, 'resetPassword']); // TODO
        Route::put('employees/{id}/deactivate', [EmployeeController::class, 'deactivate']);

        // ACCOUNT ROUTES
        Route::get('accounts', [AccountController::class, 'index']); // TODO
        Route::post('accounts', [AccountController::class, 'store']); // TODO
    });
    
    Route::group(['middleware' => 'role:Employee'], function () { // TEST
        Route::get('employee/loans', [LoanController_Employee::class, 'index']); 
        Route::get('employee/loans/{id}', [LoanController_Employee::class, 'show']);
        Route::post('employee/loans', [LoanController_Employee::class, 'store']);

        Route::get('account', [AccountController::class, 'show']); // TO TEST
    });
    
});

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register']);

