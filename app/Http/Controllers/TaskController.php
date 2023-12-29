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

        // add user_id to request
        $formFields["user_id"] = auth()->user()->id;

        // dd($formFields);

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
