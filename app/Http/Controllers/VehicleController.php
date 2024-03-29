<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        $vehicles = Vehicle::where('company_id', $company_id)->get();
        return response()->json($vehicles);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        $vehicle = new Vehicle;
        $vehicle->make = $request->make;
        $vehicle->model = $request->model;
        $vehicle->year = $request->year;
        $vehicle->vin = $request->vin;
        $vehicle->license = $request->license;
        $vehicle->company_id = $company_id;
        $vehicle->save();

        return redirect()->back();
    }
}
