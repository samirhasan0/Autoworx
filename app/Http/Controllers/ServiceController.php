<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'discount' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        $service = new Service;
        $service->fill($validatedData);
        $service->save();

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'discount' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        $service = Service::find($id);
        $service->fill($validatedData);
        $service->save();

        return redirect()->back();
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->back();
    }
}
