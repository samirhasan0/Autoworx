<?php

use Illuminate\Support\Facades\Route;

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

Route::inertia("/", "Index");
Route::inertia("/communication/client", "Client");
Route::inertia("/communication/internal", "Internal");
Route::inertia("/communication/collaboration", "Collaboration");
Route::inertia("/sales", "Sales");
Route::inertia("task", "Task");
Route::inertia("analytics", "Analytics");
Route::inertia("invoice", "Invoice");

require __DIR__ . '/auth.php';
