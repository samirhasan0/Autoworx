<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Service;
use App\Models\Task;
use App\Models\TaskUsers;
use App\Models\User;
use App\Models\WorkOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WorkOrderController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        $validated = $request->validate([
            'invoice_id' => 'required|integer',
            'employee_id' => 'required|integer',
        ]);
        $validated['company_id'] = $company_id;

        $workOrder = new WorkOrder();
        $workOrder->invoice_id = $validated['invoice_id'];
        $workOrder->active_status = 'Active';
        $workOrder->save();

        $employee = User::find($validated['employee_id']);

        $employee->work_order_id = $workOrder->id;
        $employee->save();

        $invoice = Invoice::find($validated['invoice_id']);
        $service_id = json_decode($invoice->service_ids)[0];
        $service = Service::find($service_id);

        $task = new Task();
        $task->title = $service->name;
        $task->date = $invoice->issue_date;
        $task->start_time = Carbon::createFromTime(10, 0, 0);
        $task->end_time = Carbon::createFromTime(18, 0, 0);
        $task->type = 'task';
        $task->company_id = $company_id;
        $task->user_id = $user->id;
        $task->work_order_id = $workOrder->id;
        $task->save();

        // Add the task to the Google Calendar
        $eventId = GoogleCalendarController::createEvent($task, $employee);

        // Create the TaskUser
        TaskUsers::create([
            'task_id' => $task->id,
            'user_id' => $employee->id,
            'event_id' => $eventId,
        ]);

        return redirect()->back();
    }

    // update function: add more employees
    public function update(Request $request, WorkOrder $workOrder)
    {
        $validated = $request->validate([
            'employee_id' => 'required|integer',
        ]);

        $employee = User::find($validated['employee_id']);

        $employee->work_order_id = $workOrder->id;
        $employee->save();

        // update taskuser
        $task = Task::where('work_order_id', $workOrder->id)->first();
        $eventId = GoogleCalendarController::createEvent($task, $employee);

        TaskUsers::create([
            'task_id' => $task->id,
            'user_id' => $employee->id,
            'event_id' => $eventId,
        ]);

        return redirect()->back();
    }

    // delete: change work order status to archived
    public function destroy(WorkOrder $workOrder)
    {
        $workOrder->active_status = 'Archived';
        $workOrder->deleted_at = now();
        $workOrder->save();

        $employees = User::where('work_order_id', $workOrder->id)->get();
        foreach ($employees as $employee) {
            $employee->work_order_id = null;
            $employee->save();
        }

        // Delete task, task_users, and events
        $task = Task::where('work_order_id', $workOrder->id)->first();
        $taskUsers = TaskUsers::where('task_id', $task->id)->get();

        foreach ($taskUsers as $taskUser) {
            GoogleCalendarController::deleteEvent($task, $taskUser->user);
            $taskUser->delete();
        }

        $task->delete();

        return redirect()->back();
    }

    public function removeEmployee(User $employee)
    {

        $task = Task::where('work_order_id', $employee->work_order_id)->first();

        GoogleCalendarController::deleteEvent($task, $employee);

        $taskUser = TaskUsers::where('task_id', $task->id);
        $taskUser->delete();

        $employee->work_order_id = null;
        $employee->save();

        return redirect()->back();
    }
}
