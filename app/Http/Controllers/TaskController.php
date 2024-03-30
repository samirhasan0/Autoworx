<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Http\Controllers\GoogleCalendarController;
use App\Models\TaskUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display Task page.
     */
    public function index()
    {
        $user = auth()->user();
        $company_id = $user->company_id;
        // Tasks with assigned users
        $taskWithAssignedUsers = [];

        // Get all tasks for the company
        $tasks = Task::where('company_id', $company_id)->get();

        // Loop through the tasks
        foreach ($tasks as $task) {
            // Get the assigned users
            // convert assignedUsers to an array containing only user_id
            $assignedUsers = TaskUsers::where('task_id', $task->id)->pluck('user_id')->toArray();

            // Merge the assigned users with the task
            $taskWithAssignedUsers[] = array_merge($task->toArray(), ['assigned_users' => $assignedUsers]);
        }

        // return the tasks
        return Inertia::render('Task', [
            'tasks' => $taskWithAssignedUsers,
            'users' => User::where('company_id', $company_id)->get(),
        ]);
    }

    /**
     * Create a new task.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        // validate the request
        $formFields = $request->validate([
            "title" => "required",
            "date" => "required|date",
            "start_time" => "required",
            "end_time" => "required",
            "type" => "required|in:" . implode(",", Task::TYPES),
        ]);
        $formFields["assigned_users"] = $request->input("assigned_users", "");
        $formFields["timezone"] = $request->input("timezone", ""); // TODO
        $formFields["company_id"] = $company_id;

        // add user_id to request
        $formFields["user_id"] = auth()->user()->id;

        // create the task
        $task = Task::create($formFields);

        // assigned users for the task
        $assignedUsers = $formFields["assigned_users"] ?? [];

        foreach ($assignedUsers as $assignedUser) {
            // get the user
            $user = User::find($assignedUser);

            // create the event for the user
            $eventId = GoogleCalendarController::createEvent($task, $user);

            // Create the task_user
            TaskUsers::create([
                'task_id' => $task->id,
                'user_id' => $assignedUser,
                'event_id' => $eventId,
            ]);
        }

        // redirect to task page
        return redirect()->back();
    }

    /**
     * Update a task.
     */
    public function update(Request $request, $id)
    {
        // validate the request
        $formFields = $request->validate([
            "title" => "required",
            "date" => "required|date",
            "start_time" => "required",
            "end_time" => "required",
            "type" => "required|in:" . implode(",", Task::TYPES),
        ]);
        $formFields["assigned_users"] = $request->input("assigned_users", "");
        $formFields["timezone"] = $request->input("timezone", "");

        // Find the task
        $task = Task::find($id);

        // Find the assigned users
        $taskUsers = TaskUsers::where('task_id', $id)->get();

        // Get the assigned users from the form
        $assignedUsers = $formFields["assigned_users"];
        // Find the difference between the assigned users and the new assigned users
        $addedAssignedUsers = array_diff($assignedUsers, $taskUsers->pluck('user_id')->toArray());
        $removedAssignedUsers = array_diff($taskUsers->pluck('user_id')->toArray(), $assignedUsers);

        // Create the event for the added assigned users
        foreach ($addedAssignedUsers as $addedAssignedUser) {
            // Get the user
            $user = User::find($addedAssignedUser);

            // Create the event in google calendar
            $eventId = GoogleCalendarController::createEvent($task, $user);

            // Create the task_user to assign the user to the task
            TaskUsers::create([
                'task_id' => $id,
                'user_id' => $addedAssignedUser,
                'event_id' => $eventId,
            ]);
        }

        // Delete the event for the removed assigned users
        foreach ($removedAssignedUsers as $removedAssignedUser) {
            // Get the user
            $user = User::find($removedAssignedUser);

            // Delete the event
            GoogleCalendarController::deleteEvent($task, $user);

            // Delete the task_user
            TaskUsers::where('task_id', $id)->where('user_id', $removedAssignedUser)->delete();
        }

        // Update the task
        $task->update($formFields);

        // Now get the assigned users from database
        $taskUsers = TaskUsers::where('task_id', $id)->get();

        // update the event for all currently assigned users
        foreach ($taskUsers as $taskUser) {
            // get the user
            $user = User::find($taskUser->user_id);

            // update the event
            GoogleCalendarController::updateEvent($task, $user);
        }

        // redirect to the task page
        return redirect()->back();
    }

    /**
     * Assign tasks to a user. 
     */
    public function assignTasks(Request $request)
    {
        // validate the request
        $formFields = $request->validate([
            "user" => "required|exists:users,id",
            "tasks" => "required|array", // [[task_id, boolean], [task_id, boolean]]
        ]);

        // get the user
        $user = User::find($formFields["user"])->first();


        // loop through the tasks
        foreach ($formFields["tasks"] as $taskData) {
            // get the task
            $task = Task::find($taskData[0]);
            // should the user be assigned to the task?
            $shouldAssign = $taskData[1];

            // check if the task exists
            if (!$task) {
                return redirect()->back()->withErrors(["tasks" => "One or more tasks do not exist"]);
            }

            // get the assigned users
            $assignedUsers = TaskUsers::where('task_id', $task->id)->pluck('user_id')->toArray();

            // add or remove the user from these tasks
            if ($shouldAssign) {
                // check if the user is already assigned to the task
                // if not, assign the user to the task. else nothing
                if (!in_array($user->id, $assignedUsers)) {
                    // create the event in google calendar
                    $eventId = GoogleCalendarController::createEvent($task, $user);

                    // Create the task_user
                    TaskUsers::create([
                        'task_id' => $task->id,
                        'user_id' => $user->id,
                        'event_id' => $eventId,
                    ]);
                }
            } else {
                // check if the user is already assigned to the task
                // if yes, remove the user from the task. else nothing
                if (in_array($user->id, $assignedUsers)) {
                    // delete the event from google calendar
                    GoogleCalendarController::deleteEvent($task, $user);
                    // Delete the task_user
                    TaskUsers::where('task_id', $task->id)->where('user_id', $user->id)->delete();
                }
            }
        }

        // redirect to the user page
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // get the task
        $task = Task::find($id);

        // get the assigned users
        $assignedUsers = TaskUsers::where('task_id', $id)->pluck('user_id')->toArray();

        // Delete the event for all assigned users
        foreach ($assignedUsers as $assignedUser) {
            // Get the user
            $user = User::find($assignedUser);

            // Delete the event
            GoogleCalendarController::deleteEvent($task, $user);

            // Delete the task_user
            TaskUsers::where('task_id', $id)->where('user_id', $assignedUser)->delete();
        }

        // delete the task
        $task->delete();

        // redirect to the task page
        return redirect()->back();
    }
}
