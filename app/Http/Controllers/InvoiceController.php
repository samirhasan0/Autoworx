<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Payment;
use App\models\Customer;
use App\Models\InvoiceAdditional;
use App\models\Vehicle;
use App\models\Service;
use App\models\Settings;
use App\Models\User;
use App\Models\WorkOrder;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class InvoiceController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        // need: invoice_id, customer_name, vehicle_model, issue_date, status, customer_email, customer_id, grand_total
        // get all invoices of the company
        $invoices = Invoice::where('company_id', $company_id)->get();
        // get all customers of the company
        $customers = Customer::where('company_id', $company_id)->get();
        // get all vehicles of the company
        $vehicles = Vehicle::where('company_id', $company_id)->get();
        // get all services

        // combine all data
        $data = [];
        foreach ($invoices as $invoice) {
            $customer = $customers->where('id', $invoice->customer_id)->first();
            $vehicle = $vehicles->where('id', $invoice->vehicle_id)->first();
            $data[] = [
                'invoice_id' => $invoice->invoice_id,
                'customer_name' => $customer->name,
                'vehicle_model' => $vehicle->model,
                'issue_date' => $invoice->issue_date,
                'status' => $invoice->status,
                'customer_email' => $customer->email,
                'customer_id' => $customer->id,
                'grand_total' => $invoice->grand_total,
            ];
        }

        return Inertia::render('Invoice/Index', [
            'invoices' => $data,
        ]);
    }

    public function show($invoiceId)
    {
        $invoice = Invoice::where('invoice_id', $invoiceId)->first();
        $customer = Customer::find($invoice->customer_id);
        $vehicle = Vehicle::find($invoice->vehicle_id);
        $services = Service::whereIn('id', json_decode($invoice->service_ids))->get();
        $payments = Payment::where('invoice_id', $invoice->id)->get();
        $work_orders = WorkOrder::where('invoice_id', $invoice->id)->get();
        $employees = User::where('role', 'employee')->select('id', 'name', 'work_order_id')->get();

        return Inertia::render('Invoice/Show', [
            'invoice' => $invoice,
            'customer' => $customer,
            'vehicle' => $vehicle,
            'services' => $services,
            'payments' => $payments,
            'settings' => Settings::first(),
            'work_orders' => $work_orders,
            'employees' => $employees,
        ]);

        // TODO: if the invoice is not found, or the user is not authorized, return invoice error
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $company_id = $user->company_id;

        $validatedData = $request->validate([
            'invoiceId' => 'required|max:14',

            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'customer_mobile' => 'required',
            'customer_address' => 'nullable',
            'customer_city' => 'nullable',
            'customer_state' => 'nullable',
            'customer_zip' => 'nullable',

            'vehicle_make' => 'required',
            'vehicle_model' => 'required',
            'vehicle_year' => 'nullable',
            'vehicle_vin' => 'nullable',
            'vehicle_license' => 'nullable',

            'services' => 'required|array',
            'services.*.name' => 'required',
            'services.*.price' => 'required',
            'services.*.description' => 'nullable',
            'services.*.quantity' => 'nullable',
            'services.*.discount' => 'nullable',
            'services.*.total' => 'nullable',

            'photo' => 'nullable',

            'pricing_subtotal' => 'nullable',
            'pricing_discount' => 'nullable',
            'pricing_tax' => 'nullable',
            'pricing_grand_total' => 'nullable',
            'pricing_deposit' => 'nullable',
            'pricing_due' => 'nullable',

            'additional_notes' => 'nullable',
            'additional_terms' => 'nullable',
            'additional_policy' => 'nullable',

            'payments' => 'required|array',
            'payments.*.method' => 'required',
            'payments.*.amount' => 'required',
            'payments.*.type' => 'nullable',
            'payments.*.note' => 'nullable',

            'status' => 'required',
            'sendMail' => 'required',

            'issue_date' => 'required',
            'salesperson' => 'required',
        ]);

        // Add company_id to the validated data
        $validatedData['company_id'] = $company_id;

        // parse the issue date
        $validatedData['issue_date'] = Carbon::parse($validatedData['issue_date']);

        // Search customers by mobile number, if not exists create a new customer
        $customer = Customer::where('mobile', $validatedData['customer_mobile'])->first();
        if (!$customer) {
            $customer = Customer::create([
                'name' => $validatedData['customer_name'],
                'email' => $validatedData['customer_email'],
                'mobile' => $validatedData['customer_mobile'],
                'address' => $validatedData['customer_address'] ?? '',
                'city' => $validatedData['customer_city'] ?? '',
                'state' => $validatedData['customer_state'] ?? '',
                'zip' => $validatedData['customer_zip'] ?? '',
            ]);
        }

        // Create a vehicle if not exists
        $vehicle = Vehicle::firstOrCreate([
            'make' => $validatedData['vehicle_make'],
            'model' => $validatedData['vehicle_model'],
            'year' => $validatedData['vehicle_year'] ?? '',
            'vin' => $validatedData['vehicle_vin'] ?? '',
            'license' => $validatedData['vehicle_license'] ?? '',
        ]);

        // Create services
        $services = [];
        foreach ($validatedData['services'] as $service) {
            $services[] = Service::firstOrCreate([
                'name' => $service['name'],
                'price' => $service['price'],
                'description' => $service['description'] ?? '',
                'quantity' => $service['quantity'] ?? 1,
                'discount' => $service['discount'] ?? 0,
                'total' => $service['total'] ?? $service['price'],
            ])->id;
        }

        // Name of the photo
        $fileName = $request->file('photo') ? $validatedData['invoiceId'] . '.' . $request->file('photo')->extension() : null;

        // Create invoice
        $invoice = Invoice::create([
            'invoice_id' => $validatedData['invoiceId'],
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'service_ids' => json_encode($services),
            'photo' => $fileName,
            'subtotal' => $validatedData['pricing_subtotal'],
            'discount' => $validatedData['pricing_discount'],
            'tax' => $validatedData['pricing_tax'],
            'grand_total' => $validatedData['pricing_grand_total'],
            'deposit' => $validatedData['pricing_deposit'],
            'due' => $validatedData['pricing_due'],
            'status' => $validatedData['status'],
            'send_mail' => $validatedData['sendMail'],
            'notes' => $validatedData['additional_notes'] ?? '',
            'terms' => $validatedData['additional_terms'] ?? '',
            'policy' => $validatedData['additional_policy'] ?? '',
            'issue_date' => $validatedData['issue_date'],
            'salesperson' => $validatedData['salesperson'],
            'company_id' => $company_id,

        ]);

        // Create payments
        foreach ($validatedData['payments'] as $payment) {
            Payment::create([
                'invoice_id' => $invoice->id,
                'method' => $payment['method'],
                'amount' => $payment['amount'],
                'type' => $payment['type'] ?? 'Payment',
                'note' => $payment['note'] ?? '',
                'date' =>  now(),
            ]);
        }


        // Get the InvoiceAdditional model
        $invoiceAdditional = InvoiceAdditional::where('company_id', $company_id)->first();

        // If the model does not exist, create a new one, otherwise update the existing one
        if (!$invoiceAdditional) {
            InvoiceAdditional::create([
                'company_id' => $company_id,
                'note' => $validatedData['additional_notes'] ?? '',
                'terms' => $validatedData['additional_terms'] ?? '',
                'policy' => $validatedData['additional_policy'] ?? '',
            ]);
        } else {
            $invoiceAdditional->update([
                'note' => $validatedData['additional_notes'] ?? '',
                'terms' => $validatedData['additional_terms'] ?? '',
                'policy' => $validatedData['additional_policy'] ?? '',
            ]);
        }

        // Upload photo
        if ($request->hasFile('photo')) {
            $request->file('photo')->storeAs('public/invoices', $fileName);
        }

        // dd($services);

        // If send_mail is true, send an email to the customer
        if ($validatedData['sendMail']) {
            $services = Service::whereIn('id', json_decode($invoice->service_ids))->get();

            // generate pdf
            $pdf = Pdf::loadView('invoice', [
                'invoice' => $invoice,
                'customer' => $customer,
                'vehicle' => $vehicle,
                'services' => $services,
                'settings' => Settings::first(),
            ]);

            // send email
            Mail::send('emails.invoice', [
                'customer' => $customer,
            ], function ($message) use ($customer, $pdf) {
                $message->to($customer->email, $customer->name)
                    ->subject('Invoice from Autoworx')
                    ->attachData($pdf->output(), 'invoice.pdf');
            });
        }

        return redirect()->route('invoice.show', $invoice->invoice_id);
    }

    // Similar to store function, but instead of storing data, it directly downloads the pdf
    public function estimate(Request $request)
    {
        $validatedData = $request->validate([
            'invoiceId' => 'required|max:14',

            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'customer_mobile' => 'required',
            'customer_address' => 'nullable',
            'customer_city' => 'nullable',
            'customer_state' => 'nullable',
            'customer_zip' => 'nullable',

            'vehicle_make' => 'required',
            'vehicle_model' => 'required',
            'vehicle_year' => 'nullable',
            'vehicle_vin' => 'nullable',
            'vehicle_license' => 'nullable',

            'services' => 'required|array',
            'services.*.name' => 'required',
            'services.*.price' => 'required',
            'services.*.description' => 'nullable',
            'services.*.quantity' => 'nullable',
            'services.*.discount' => 'nullable',
            'services.*.total' => 'nullable',

            'photo' => 'nullable',

            'pricing_subtotal' => 'nullable',
            'pricing_discount' => 'nullable',
            'pricing_tax' => 'nullable',
            'pricing_grand_total' => 'nullable',
            'pricing_deposit' => 'nullable',
            'pricing_due' => 'nullable',

            'additional_notes' => 'nullable',
            'additional_terms' => 'nullable',
            'additional_policy' => 'nullable',

            'payments' => 'required|array',
            'payments.*.method' => 'required',
            'payments.*.amount' => 'required',
            'payments.*.type' => 'nullable',
            'payments.*.note' => 'nullable',

            'status' => 'required',
            'sendMail' => 'required',

            'issue_date' => 'required',
            'salesperson' => 'required',
        ]);

        // Generate the pdf
        $pdf = Pdf::loadView('invoice', [
            'invoice' => [
                'invoice_id' => $validatedData['invoiceId'],
                'issue_date' => $validatedData['issue_date'],
                'salesperson' => $validatedData['salesperson'],
                'status' => $validatedData['status'],
                'send_mail' => $validatedData['sendMail'],
                'notes' => $validatedData['additional_notes'] ?? '',
                'terms' => $validatedData['additional_terms'] ?? '',
                'policy' => $validatedData['additional_policy'] ?? '',
                'subtotal' => $validatedData['pricing_subtotal'],
                'discount' => $validatedData['pricing_discount'],
                'tax' => $validatedData['pricing_tax'],
                'grand_total' => $validatedData['pricing_grand_total'],
                'deposit' => $validatedData['pricing_deposit'],
                'due' => $validatedData['pricing_due'],
                'created_at' => now(),
            ],
            'customer' => [
                'name' => $validatedData['customer_name'],
                'email' => $validatedData['customer_email'],
                'mobile' => $validatedData['customer_mobile'],
                'address' => $validatedData['customer_address'] ?? '',
                'city' => $validatedData['customer_city'] ?? '',
                'state' => $validatedData['customer_state'] ?? '',
                'zip' => $validatedData['customer_zip'] ?? '',
            ],
            'vehicle' => [
                'make' => $validatedData['vehicle_make'],
                'model' => $validatedData['vehicle_model'],
                'year' => $validatedData['vehicle_year'] ?? '',
                'vin' => $validatedData['vehicle_vin'] ?? '',
                'license' => $validatedData['vehicle_license'] ?? '',
            ],
            'services' => $validatedData['services'],
            'settings' => Settings::first(),
        ]);

        $fileName = $validatedData['invoiceId'] . '.pdf';

        // save the pdf
        $pdf->save(storage_path('app/public/temp/' . $fileName));

        // redirect the user
        // return redirect()->route('invoice.download', $fileName);
        return redirect()->back();
    }



    public function edit($id)
    {
        $invoice = Invoice::where('invoice_id', $id)->first();
        $customer = Customer::find($invoice->customer_id);
        $vehicle = Vehicle::find($invoice->vehicle_id);
        $current_services = Service::whereIn('id', json_decode($invoice->service_ids))->get();
        $current_payments = Payment::where('invoice_id', $invoice->id)->get();

        return Inertia::render('Invoice/Edit', [
            'invoice' => $invoice,
            'customer' => $customer,
            'vehicle' => $vehicle,
            'current_services' => $current_services,
            'current_payments' => $current_payments,
            'settings' => Settings::first(),
            "customers" => Customer::all(),
            "vehicles" => Vehicle::all(),
            "services" => Service::all(),
        ]);

        // TODO: if the invoice is not found, or the user is not authorized, return invoice error
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'invoiceId' => 'required|max:14',

            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'customer_mobile' => 'required',
            'customer_address' => 'nullable',
            'customer_city' => 'nullable',
            'customer_state' => 'nullable',
            'customer_zip' => 'nullable',

            'vehicle_make' => 'required',
            'vehicle_model' => 'required',
            'vehicle_year' => 'nullable',
            'vehicle_vin' => 'nullable',
            'vehicle_license' => 'nullable',

            'services' => 'required|array',
            'services.*.name' => 'required',
            'services.*.price' => 'required',
            'services.*.description' => 'nullable',
            'services.*.quantity' => 'nullable',
            'services.*.discount' => 'nullable',
            'services.*.total' => 'nullable',

            'photo' => 'nullable',

            'pricing_subtotal' => 'nullable',
            'pricing_discount' => 'nullable',
            'pricing_tax' => 'nullable',
            'pricing_grand_total' => 'nullable',
            'pricing_deposit' => 'nullable',
            'pricing_due' => 'nullable',

            'additional_notes' => 'nullable',
            'additional_terms' => 'nullable',
            'additional_policy' => 'nullable',

            'payments' => 'required|array',
            'payments.*.method' => 'required',
            'payments.*.amount' => 'required',
            'payments.*.type' => 'nullable',
            'payments.*.note' => 'nullable',

            'status' => 'required',
            'sendMail' => 'required',

            'issue_date' => 'required',
            'salesperson' => 'required',
        ]);

        // Search customers by mobile number, if not exists create a new customer
        $customer = Customer::where('mobile', $validatedData['customer_mobile'])->first();
        if (!$customer) {
            $customer = Customer::create([
                'name' => $validatedData['customer_name'],
                'email' => $validatedData['customer_email'],
                'mobile' => $validatedData['customer_mobile'],
                'address' => $validatedData['customer_address'] ?? '',
                'city' => $validatedData['customer_city'] ?? '',
                'state' => $validatedData['customer_state'] ?? '',
                'zip' => $validatedData['customer_zip'] ?? '',
            ]);
        } else {
            $customer->update([
                'name' => $validatedData['customer_name'],
                'email' => $validatedData['customer_email'],
                'mobile' => $validatedData['customer_mobile'],
                'address' => $validatedData['customer_address'] ?? '',
                'city' => $validatedData['customer_city'] ?? '',
                'state' => $validatedData['customer_state'] ?? '',
                'zip' => $validatedData['customer_zip'] ?? '',
            ]);
        }

        // Create a vehicle if not exists
        $vehicle = Vehicle::firstOrCreate([
            'make' => $validatedData['vehicle_make'],
            'model' => $validatedData['vehicle_model'],
            'year' => $validatedData['vehicle_year'] ?? '',
            'vin' => $validatedData['vehicle_vin'] ?? '',
            'license' => $validatedData['vehicle_license'] ?? '',
        ]);

        // Create services
        $services = [];
        foreach ($validatedData['services'] as $service) {
            $services[] = Service::firstOrCreate([
                'name' => $service['name'],
                'price' => $service['price'],
                'description' => $service['description'] ?? '',
                'quantity' => $service['quantity'] ?? 1,
                'discount' => $service['discount'] ?? 0,
                'total' => $service['total'] ?? $service['price'],
            ])->id;
        }


        // Name of the photo
        $fileName = $request->file('photo') ? $validatedData['invoiceId'] . '.' . $request->file('photo')->extension() : null;

        // Update invoice
        $invoice = Invoice::where('invoice_id', $id)->first();
        $invoice->update([
            'invoice_id' => $validatedData['invoiceId'],
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'service_ids' => json_encode($services),
            'photo' => $fileName,
            'subtotal' => $validatedData['pricing_subtotal'],
            'discount' => $validatedData['pricing_discount'],
            'tax' => $validatedData['pricing_tax'],
            'grand_total' => $validatedData['pricing_grand_total'],
            'deposit' => $validatedData['pricing_deposit'],
            'due' => $validatedData['pricing_due'],
            'status' => $validatedData['status'],
            'send_mail' => $validatedData['sendMail'],
            'notes' => $validatedData['additional_notes'] ?? '',
            'terms' => $validatedData['additional_terms'] ?? '',
            'policy' => $validatedData['additional_policy'] ?? '',
            'issue_date' => $validatedData['issue_date'],
            'salesperson' => $validatedData['salesperson'],
        ]);

        // Create payments
        Payment::where('invoice_id', $invoice->id)->delete();
        foreach ($validatedData['payments'] as $payment) {
            Payment::create([
                'invoice_id' => $invoice->id,
                'method' => $payment['method'],
                'amount' => $payment['amount'],
                'type' => $payment['type'] ?? 'Payment',
                'note' => $payment['note'] ?? '',
                'date' =>  now(),
            ]);
        }

        $user = auth()->user();
        $company_id = $user->company_id;

        // Get the InvoiceAdditional model
        $invoiceAdditional = InvoiceAdditional::where('company_id', $company_id)->first();

        // If the model does not exist, create a new one, otherwise update the existing one
        if (!$invoiceAdditional) {
            InvoiceAdditional::create([
                'company_id' => $company_id,
                'note' => $validatedData['additional_notes'] ?? '',
                'terms' => $validatedData['additional_terms'] ?? '',
                'policy' => $validatedData['additional_policy'] ?? '',
            ]);
        } else {
            $invoiceAdditional->update([
                'note' => $validatedData['additional_notes'] ?? '',
                'terms' => $validatedData['additional_terms'] ?? '',
                'policy' => $validatedData['additional_policy'] ?? '',
            ]);
        }

        // Upload photo
        if ($request->hasFile('photo')) {
            // delete the old photo
            if ($invoice->photo) {
                unlink(storage_path('app/public/invoices/' . $invoice->photo));
            }
            $request->file('photo')->storeAs('public/invoices', $fileName);
        }

        return redirect()->route('invoice.show', $invoice->invoice_id);
    }

    public function pdf($id)
    {
        $invoice = Invoice::where('invoice_id', $id)->first();
        $customer = Customer::find($invoice->customer_id);
        $vehicle = Vehicle::find($invoice->vehicle_id);
        $services = Service::whereIn('id', json_decode($invoice->service_ids))->get();
        $payments = Payment::where('invoice_id', $invoice->id)->get();
        $work_orders = WorkOrder::where('invoice_id', $invoice->id)->get();
        $employees = User::where('role', 'employee')->select('id', 'name', 'work_order_id')->get();

        $pdf = Pdf::loadView('invoice', [
            'invoice' => $invoice,
            'customer' => $customer,
            'vehicle' => $vehicle,
            'services' => $services,
            'payments' => $payments,
            'settings' => Settings::first(),
            'work_orders' => $work_orders,
            'employees' => $employees,
        ]);

        return $pdf->download('invoice.pdf');
    }
}
