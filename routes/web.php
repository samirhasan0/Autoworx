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
    Route::get("/communication/client/{id}", function ($id) {

        $users = [ // TODO: get actual users
            [
                "id" => 1,
                "name" => "Client 1",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol",
            ],
            [
                "id" => 2,
                "name" => "Client 2",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol",
            ],
            [
                "id" => 3,
                "name" => "Client 3",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolool sit amet",
            ],
            [
                "id" => 4,
                "name" => "Client 4",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 5,
                "name" => "Client 5",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol",
            ],
            [
                "id" => 6,
                "name" => "Client 6",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 7,
                "name" => "Client 7",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 8,
                "name" => "Client 8",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 9,
                "name" => "Client 9",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 10,
                "name" => "Client 10",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 11,
                "name" => "Client 11",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
            [
                "id" => 12,
                "name" => "Client 12",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
            ],
        ];

        return Inertia\Inertia::render("Client", [
            "users" => $users,
            "id" => $id
        ]);
    });
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
