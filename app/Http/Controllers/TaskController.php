<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

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

        // create the task
        Task::create($formFields);

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
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
