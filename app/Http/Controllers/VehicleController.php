<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::all();
        return response()->json($vehicles);
    }

    public function store(Request $request)
    {
        $vehicle = new Vehicle;
        $vehicle->make = $request->make;
        $vehicle->model = $request->model;
        $vehicle->year = $request->year;
        $vehicle->vin = $request->vin;
        $vehicle->license = $request->license;
        $vehicle->save();

        return redirect()->back();
    }
}
