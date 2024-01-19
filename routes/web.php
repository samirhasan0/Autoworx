<?php

use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;

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
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 2,
                "name" => "Client 2",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol",
                "email" => "khalilorrahman2005@gmail.com"
            ],
            [
                "id" => 3,
                "name" => "Client 3",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolool sit amet",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 4,
                "name" => "Client 4",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 5,
                "name" => "Client 5",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae volLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu odit, voluptatum, quibusdam, quia quae vol",
                "email" => "samkrc2000@gmail.com"
            ],
            [
                "id" => 6,
                "name" => "Client 6",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 7,
                "name" => "Client 7",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"

            ],
            [
                "id" => 8,
                "name" => "Client 8",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 9,
                "name" => "Client 9",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 10,
                "name" => "Client 10",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 11,
                "name" => "Client 11",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
            [
                "id" => 12,
                "name" => "Client 12",
                "company" => "Client Company",
                "image" => "/images/default.png",
                "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Qu",
                "email" => "shantoforemail@gmail.com"
            ],
        ];

        $user = collect($users)->firstWhere("id", $id);
        $emails = MailController::get($user["email"]);

        return Inertia\Inertia::render("Client", [
            "users" => $users,
            "id" => $id,
            "emails" => $emails,
        ]);
    });
    Route::post("/communication/client/{id}/email", function (Request $request, $id) {
        // TODO: validate request
        $to = $request->input("to");
        $subject = $request->input("subject");
        $message = $request->input("message");

        MailController::send($to, $subject, $message);

        return redirect("/communication/client/$id");
    })->name("client.email");

    Route::inertia("/communication/internal", "Internal", [
        "users" => App\Models\User::all(),
    ]);
    Route::inertia("/communication/collaboration", "Collaboration", [
        // company: id, name, image, users: [id, name: User[1,2,3], image, ]
        "companies" => [
            [
                "id" => 1,
                "name" => "Company",
                "image" => "/images/default.png",
                "users" => [
                    [
                        "id" => 1,
                        "name" => "User 1",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 2,
                        "name" => "User 2",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 3,
                        "name" => "User 3",
                        "image" => "/images/default.png",
                    ],
                ]
            ],
            [
                "id" => 2,
                "name" => "Company 2", "image" => "/images/default.png",
                "users" => [
                    [
                        "id" => 4,
                        "name" => "User 4",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 5,
                        "name" => "User 5",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 6,
                        "name" => "User 6",
                        "image" => "/images/default.png",
                    ],
                ]
            ],
            [
                "id" => 3,
                "name" => "Company 3", "image" => "/images/default.png",
                "users" => [
                    [
                        "id" => 7,
                        "name" => "User 7",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 8,
                        "name" => "User 8",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 9,
                        "name" => "User 9",
                        "image" => "/images/default.png",
                    ],
                ]
            ],
            [
                "id" => 4,
                "name" => "Company 4", "image" => "/images/default.png",
                "users" => [
                    [
                        "id" => 10,
                        "name" => "User 10",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 11,
                        "name" => "User 11",
                        "image" => "/images/default.png",
                    ],
                    [
                        "id" => 12,
                        "name" => "User 12",
                        "image" => "/images/default.png",
                    ],
                ],
            ],

        ]
    ]);
    Route::inertia("/sales", "Sales");
    Route::get("/task", function () {
        return Inertia\Inertia::render("Task", [
            "tasks" => App\Models\Task::all(),
            "users" => App\Models\User::all(),
        ]);
    });
    Route::delete("/task/{task}", [TaskController::class, "destroy"])->name("task.destroy");
    Route::inertia("analytics", "Analytics");
    Route::inertia("invoice", "Invoice");

    Route::post("/task", [TaskController::class, "store"])->name("task.store");
    Route::put("/task", [TaskController::class, "assignTasks"])->name("task.assign");
});


require __DIR__ . '/auth.php';
