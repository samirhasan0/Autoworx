<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public static function index()
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        $employees = User::where('role', 'employee')
            ->where('company_id', $company_id)
            ->select('id', 'name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'employee_type', 'employee_department')
            ->get();
        return $employees;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:8',
            'phone' => 'required|unique:users',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            'zip' => 'required|max:10',
            'employee_type' => 'required|in:Salary,Hourly,Contract Based',
            'employee_department' => 'required|in:Sales,Management,Workshop',
        ]);

        $user = auth()->user();
        $validatedData['company_id'] = $user->company_id;

        $employee = new User;
        $employee->fill($validatedData);
        $employee->password = Hash::make($request->password);
        $employee->role = 'employee';
        $employee->save();

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'phone' => 'required',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            'zip' => 'required|max:10',
            'employee_type' => 'required|in:Salary,Hourly,Contract Based',
            'employee_department' => 'required|in:Sales,Management,Workshop',
        ]);

        $employee = User::find($id);
        $employee->fill($validatedData);

        // check if the new_password field is not empty
        if ($request->new_password) {
            $old_password = $request->validate([
                'old_password' => 'required|min:8',
            ]);

            // match the old password with the current password
            if (Hash::check($old_password['old_password'], $employee->password)) {
                // check if the new password is minimum 8 characters
                $request->validate([
                    'new_password' => 'required|min:8',
                ]);

                $employee->password = Hash::make($request->new_password);
            } else {
                return redirect()->back()->withErrors(['old_password' => 'The old password is incorrect.']);
            }
        }

        $employee->save();

        return redirect()->back();
    }

    public function destroy($id)
    {
        $employee = User::find($id);
        $employee->delete();

        return redirect()->back();
    }
}
