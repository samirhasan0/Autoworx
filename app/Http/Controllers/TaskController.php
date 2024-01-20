<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Http\Controllers\GoogleCalendarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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

        // Check if the date is in the past
        if (strtotime($formFields["date"]) < strtotime(date("Y-m-d"))) {
            return redirect()->back()->withErrors(["date" => "The date cannot be in the past"]);
        }

        // Check if the start time with date is in the past
        if (strtotime($formFields["date"] . " " . $formFields["start_time"]) < strtotime(date("Y-m-d H:i"))) {
            return redirect()->back()->withErrors(["start_time" => "The start time cannot be in the past"]);
        }

        // Check if the end time is less than or equal the start time
        if (strtotime($formFields["end_time"]) <= strtotime($formFields["start_time"])) {
            return redirect()->back()->withErrors(["end_time" => "The end time cannot be less than or equal the start time"]);
        }

        // Check if the start_time is between an existing task
        $tasks = Task::where("date", $formFields["date"])
            ->where("user_id", auth()->user()->id)
            ->where(function ($query) use ($formFields) {
                $query->whereBetween("start_time", [$formFields["start_time"], $formFields["end_time"]])
                    ->orWhereBetween("end_time", [$formFields["start_time"], $formFields["end_time"]]);
            })
            ->get();
        if ($tasks->count() > 0) {
            return redirect()->back()->withErrors(["start_time" => "A task already exists. Please choose another time"]);
        }

        // add user_id to request
        $formFields["user_id"] = auth()->user()->id;
        // add the current user to the assigned users
        $formFields["assigned_users"] = auth()->user()->id . "," . $formFields["assigned_users"];

        // create the task
        $task = Task::create($formFields);

        // create the event in google calendar
        GoogleCalendarController::createEvent($task);

        // redirect to task page
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
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
        $formFields["assigned_users"] = $request->input("assigned_users") ?? Auth()->user()->id;
        $formFields["timezone"] = $request->input("timezone", "");

        // Check if the date is in the past
        if (strtotime($formFields["date"]) < strtotime(date("Y-m-d"))) {
            return redirect()->back()->withErrors(["date" => "The date cannot be in the past"]);
        }

        // Check if the start time with date is in the past
        if (strtotime($formFields["date"] . " " . $formFields["start_time"]) < strtotime(date("Y-m-d H:i"))) {
            return redirect()->back()->withErrors(["start_time" => "The start time cannot be in the past"]);
        }

        // Check if the end time is less than or equal the start time
        if (strtotime($formFields["end_time"]) <= strtotime($formFields["start_time"])) {
            return redirect()->back()->withErrors(["end_time" => "The end time cannot be less than or equal the start time"]);
        }

        // Check if the start_time is between an existing task
        $tasks = Task::where("date", $formFields["date"])
            ->where("user_id", auth()->user()->id)
            ->where("id", "!=", $id)
            ->where(function ($query) use ($formFields) {
                $query->whereBetween("start_time", [$formFields["start_time"], $formFields["end_time"]])
                    ->orWhereBetween("end_time", [$formFields["start_time"], $formFields["end_time"]]);
            })
            ->get();
        if ($tasks->count() > 0) {
            return redirect()->back()->withErrors(["start_time" => "A task already exists. Please choose another time"]);
        }

        // get the task
        $task = Task::find($id);

        // update the task
        $task->update($formFields);

        // Update the event in google calendar
        GoogleCalendarController::updateEvent($task);

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
        $user = User::find($formFields["user"]);

        // loop through the tasks
        foreach ($formFields["tasks"] as $taskData) {
            // get the task
            $task = Task::find($taskData[0]);
            $shouldAssign = $taskData[1];

            // check if the task exists
            if (!$task) {
                return redirect()->back()->withErrors(["tasks" => "One or more tasks do not exist"]);
            }

            // convert assigned_users to an array
            $assignedUsers = explode(',', $task->assigned_users);

            // add or remove the user from these tasks
            if ($shouldAssign) {
                // check if the user is already assigned to the task
                // if not, assign the user to the task. else nothing
                if (!in_array($user->id, $assignedUsers)) {
                    $assignedUsers[] = $user->id;
                }
            } else {
                // check if the user is already assigned to the task
                // if yes, remove the user from the task. else nothing
                if (($key = array_search($user->id, $assignedUsers)) !== false) {
                    unset($assignedUsers[$key]);
                }
            }

            // update the assigned_users field
            $task->assigned_users = implode(',', $assignedUsers);
            $task->save();
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

        // delete the task
        $task->delete();

        // delete the event from google calendar
        GoogleCalendarController::deleteEvent($task);

        // redirect to the task page
        return redirect()->back();
    }
}
