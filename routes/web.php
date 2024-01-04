<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

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

Route::middleware('auth')->group(function () {
    Route::inertia("/", "Index");
    Route::inertia("/communication/client", "Client");
    Route::inertia("/communication/internal", "Internal");
    Route::inertia("/communication/collaboration", "Collaboration");
    Route::inertia("/sales", "Sales");
    Route::get("/task", function () {
        return Inertia\Inertia::render("Task", [
            "tasks" => App\Models\Task::all(),
            "users" => App\Models\User::all(),
        ]);
    });
    Route::inertia("analytics", "Analytics");
    Route::inertia("invoice", "Invoice");

    Route::post("/task", [TaskController::class, "store"])->name("task.store");
    Route::put("/task", [TaskController::class, "assignTasks"])->name("task.assign");
});


require __DIR__ . '/auth.php';
