<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WorkOrder;
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

        return redirect()->back();
    }

    public function removeEmployee(User $employee)
    {
        $employee->work_order_id = null;
        $employee->save();

        return redirect()->back();
    }
}
