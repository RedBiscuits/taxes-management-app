<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DaysController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\EntriesController;
use App\Http\Controllers\FeaturesController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReceiptsController;
use App\Http\Controllers\TargetController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// >> To Do <<
// when Targets is done add enabled middleware to it
Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('locations', LocationsController::class);

    Route::apiResource('targets', TargetController::class);

    Route::get("/receipts/all", [ReceiptsController::class, 'getAll'])->middleware('receipts_enabled');
    Route::apiResource('receipts', ReceiptsController::class)->middleware('receipts_enabled');

    Route::apiResource('entries', EntriesController::class);

    Route::apiResource('users', UsersController::class)->middleware(['admin']);

    Route::apiResource('payments', PaymentController::class)->middleware('payments_enabled');

    Route::apiResource('logs', LogController::class);

    Route::apiResource('days', DaysController::class);
    Route::controller(DaysController::class)
        ->prefix('days')
        ->name('days.')
        ->group(function () {
            Route::post('/{day}/open', 'open')->name('open');
            Route::post('/{day}/close', 'close')->name('close');
        });

    Route::controller(FeaturesController::class)
        ->prefix('features')
        ->name('features.')
        ->group(function () {
            Route::patch('/toggle', 'toggle')->name('toggle');
            Route::get('/', 'get')->name('get');
        });
});
Route::controller(AuthController::class)
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::post('/login', 'login')->name('login');
        Route::post('/logout', 'logout')->name('logout');
        Route::post('/register', 'register')->name('register');
        Route::post('/change-password', 'initialChangePassword')->name('initialChangePassword');
    });
