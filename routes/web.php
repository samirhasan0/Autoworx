<?php

use App\Events\Message;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\WorkOrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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
                "email" => "aamir@levantit.com"
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
        // "users" => App\Models\User::all(),
        // exclude current user

        "users" => App\Models\User::where("id", "!=", auth()->id())->get(),
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
    Route::get("/task", [TaskController::class, "index"])->name("task.index");
    Route::put("/task/{id}", [TaskController::class, "update"])->name("task.update");
    Route::delete("/task/{id}", [TaskController::class, "destroy"])->name("task.destroy");
    Route::inertia("analytics", "Analytics");
    Route::get("invoice", [InvoiceController::class, "index"])->name("invoice.index");
    Route::post("/invoice", [InvoiceController::class, "store"])->name("invoice.store");
    Route::inertia("invoice/create", "Invoice/Create", [
        "customers" => App\Models\Customer::all(),
        "vehicles" => App\Models\Vehicle::all(),
        "services" => App\Models\Service::all(),
        "notes" => Cache::get("notes"),
        "terms" => Cache::get("terms"),
        "policy" => Cache::get("policy"),
    ]);
    Route::get("/invoice/{id}/edit", [InvoiceController::class, "edit"])->name("invoice.edit");
    Route::put("/invoice/{id}", [InvoiceController::class, "update"])->name("invoice.update");
    Route::inertia("invoice/estimate", "Invoice/Estimate", [
        "customers" => App\Models\Customer::all(),
        "vehicles" => App\Models\Vehicle::all(),
        "services" => App\Models\Service::all(),
        "notes" => Cache::get("notes"),
        "terms" => Cache::get("terms"),
        "policy" => Cache::get("policy"),
    ]);
    Route::post("/invoice/estimate", [InvoiceController::class, "estimate"])->name("estimate");
    Route::inertia("invoice/inspection", "Invoice/Inspection");
    Route::get("/invoice/{id}", [InvoiceController::class, "show"])->name("invoice.show");
    Route::get("/invoice/{id}/pdf", [InvoiceController::class, "pdf"])->name("invoice.pdf");
    Route::get("/invoice/download/{fileName}", function () {
        $fileName = request()->fileName . ".pdf";
        $file = storage_path("app/public/temp/$fileName");

        $headers = [
            "Content-Type" => "application/pdf",
        ];

        $response = response()->download($file, $fileName, $headers)->deleteFileAfterSend(true);

        return $response;
        // return response()->json([
        //     "message" => "Download not implemented",
        // ]);
    })->name("invoice.download");
    Route::post("/task", [TaskController::class, "store"])->name("task.store");
    Route::put("/task", [TaskController::class, "assignTasks"])->name("task.assign");

    Route::inertia("/customer", "Customer", [
        "customers" => App\Models\Customer::all(),
    ]);
    Route::post('/customer', [CustomerController::class, 'store'])->name('customer.store');
    Route::put('/customer/{id}', [CustomerController::class, 'update'])->name('customer.update');
    Route::delete('/customer/{id}', [CustomerController::class, 'destroy'])->name('customer.destroy');

    Route::get('/vehicle', [VehicleController::class, 'index'])->name('vehicle.index');
    Route::post('/vehicle', [VehicleController::class, 'store'])->name('vehicle.store');

    Route::inertia("/employee", "Employee", [
        "employees" => EmployeeController::index()
    ]);
    Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');
    Route::put('/employee/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::delete('/employee/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');

    Route::inertia("/inventory/service", "Inventory/Service", [
        "services" => App\Models\Service::all(),
    ]);
    Route::post('/inventory/service', [ServiceController::class, 'store'])->name('service.store');
    Route::put('/inventory/service/{id}', [ServiceController::class, 'update'])->name('service.update');
    Route::delete('/inventory/service/{id}', [ServiceController::class, 'destroy'])->name('service.destroy');

    Route::post("/work-order", [WorkOrderController::class, "store"])->name("work_orders.store");
    Route::put("/work-order/{workOrder}", [WorkOrderController::class, "update"])->name("work_orders.update");
    Route::delete("/work-order/{workOrder}", [WorkOrderController::class, "destroy"])->name("work_orders.destroy");
    Route::delete("/work-order/remove/{employee}", [WorkOrderController::class, "removeEmployee"])->name("work_orders.remove_employee");

    Route::get("/messages/{userId}", function ($userId) {
        // Get all messages between the current user and the user with the given ID
        $messages = App\Models\Message::where(function ($query) use ($userId) {
            $query->where("from", auth()->user()->id)->where("user_id", $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where("from", $userId)->where("user_id", auth()->user()->id);
        })->get();

        return response()->json($messages);
    })->name("messages.index");

    Route::post("/send-message", function (Request $request) {
        // Save the message
        $message = new App\Models\Message();
        $message->user_id = $request->userId;
        $message->message = $request->message;
        $message->from = auth()->user()->id;
        $message->save();

        event(new Message(
            auth()->user()->id,
            $request->userId,
            $request->message
        ));
        return redirect()->back();
    })->name("messages.store");
});



require __DIR__ . '/auth.php';
