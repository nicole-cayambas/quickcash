<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('loans', [LoanController::class, 'index'])->name('loans');
    // Route::get('/loans/{id}', [LoanController::class, 'show']);
    // Route::post('/loans', [LoanController::class, 'store']);
    // Route::put('/loans/{id}', [LoanController::class, 'update']);
    // Route::delete('/loans/{id}', [LoanController::class, 'destroy']);
});

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register']);

