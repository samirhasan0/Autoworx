<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Download PDF</title>
    <style>
        * {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 0.875rem;
        }

        .inline-block {
            display: inline-block;
            vertical-align: top;
        }
    </style>
</head>

<body>
    <div style="width: 50rem; margin-top: 1rem; padding: 1.75rem; background-color: #ffffff; margin-bottom: 1.25rem;">
        <div style="width: 100%;">
            <img src="{{ public_path('icons/Logo2.png') }}" alt="Autoworx" style="width: 100px; float: left;" />

            <div style="float: right;">
                <p style="font-weight: bold; text-transform: uppercase;">Contact Information</p>
                @foreach (explode('||', $settings->contact) as $info)
                    <p>{{ $info }}</p>
                @endforeach
            </div>
            <div style="clear: both;"></div>
        </div>

        <div style="width: 100%; background-color: #8798AD; height: 1px; margin-top: 1rem; margin-bottom: 1rem;"></div>

        <div>
            <h1 style="font-size: 1.875rem; font-weight: bold; text-transform: uppercase; color: #2B6CB0;">Invoice</h1>

            <div>
                <div style="margin-top: 1.25rem; float: left; width: 33%;">
                    <h3 style="font-weight: bold;">Invoice To:</h3>
                    <p>{{ $customer['name'] }}</p>
                    <p>{{ $customer['name'] }}</p>
                    <p>{{ $customer['mobile'] }}</p>
                </div>

                <div style="float: left; width: 33%;">
                    <h3 style="font-weight: bold;">Vehicle Details:</h3>
                    <div>
                        <span style="font-weight: bold;">Year: </span>
                        <span>{{ $vehicle['year'] }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Make: </span>
                        <span>{{ $vehicle['make'] }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Model: </span>
                        <span>{{ $vehicle['model'] }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">VIN: </span>
                        <span>{{ $vehicle['vin'] }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">License Plate: </span>
                        <span>{{ $vehicle['license'] }}</span>
                    </div>
                </div>

                <div style="float: left; width: 33%;">
                    <div>
                        <span style="font-weight: bold;">Invoice Number: </span>
                        <span>{{ $invoice['invoice_id'] }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Invoice Date: </span>
                        <span>{{ $invoice['created_at'] }}</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Bill Status: </span>
                        <span>Paid</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Order Status: </span>
                        <span>{{ $invoice['status'] }}</span>
                    </div>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>

        <div>
            <table style="width: 100%; margin-top: 2.5rem; border-collapse: collapse;">
                <thead style="background-color: #F1F5F9;">
                    <tr>
                        <th style="text-align: left; padding: 0.5rem 1rem; border: 1px solid #CBD5E1; width: 40%;">
                            Product/Service</th>
                        <th style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">Quantity/Unit
                        </th>
                        <th style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">Unit Price</th>
                        <th style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">Discount Price
                        </th>
                        <th style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1; width: 13%;">
                            Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($services as $service)
                        <tr>
                            <td style="text-align: left; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                <div>
                                    <p style="float: left;">{{ $service['name'] }}</p>
                                    <p style="color: #4A5568; font-size: 0.875rem; clear: both;">
                                        {{ $service['description'] }}</p>
                                </div>
                            </td>

                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                {{ $service['quantity'] }}</td>

                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $service['price'] }}</td>

                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $service['discount'] }}</td>

                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $service['total'] }}</td>
                        </tr>
                        <tr style="border: 1px solid #CBD5E1;">
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td
                                style="padding: 0.5rem 1rem; border: 1px solid #CBD5E1; border-left: 0; font-weight: bold;">
                                Subtotal</td>
                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $invoice['subtotal'] }}
                            </td>
                        </tr>
                        <tr style="border: 1px solid #CBD5E1;">
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td
                                style="padding: 0.5rem 1rem; border: 1px solid #CBD5E1; border-left: 0; font-weight: bold;">
                                Discount</td>
                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $service['discount'] }}
                            </td>
                        </tr>
                        <tr style="border: 1px solid #CBD5E1;">
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td
                                style="padding: 0.5rem 1rem; border: 1px solid #CBD5E1; border-left: 0; font-weight: bold;">
                                Tax</td>
                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $invoice['tax'] }}
                            </td>
                        </tr>
                        <tr style="border: 1px solid #CBD5E1;">
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td
                                style="padding: 0.5rem 1rem; border: 1px solid #CBD5E1; border-left: 0; font-weight: bold;">
                                Grand Total
                            </td>
                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $invoice['grand_total'] }}
                            </td>
                        </tr>
                        <tr style="border: 1px solid #CBD5E1;">
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td
                                style="padding: 0.5rem 1rem; border: 1px solid #CBD5E1; border-left: 0; font-weight: bold;">
                                Deposit</td>
                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $invoice['deposit'] }}
                            </td>
                        </tr>
                        <tr style="border: 1px solid #CBD5E1;">
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td style="padding: 0.5rem 1rem;"></td>
                            <td
                                style="padding: 0.5rem 1rem; border: 1px solid #CBD5E1; border-left: 0; font-weight: bold;">
                                Due</td>
                            <td style="text-align: center; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                                ${{ $invoice['due'] }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div style="width: 100%; margin-top: 2.5rem;">
            <div style="width: 50%; float: left;">
                <h3 style="font-weight: bold;">Terms & Conditions</h3>
                <p>{{ $invoice['terms'] }}</p>
            </div>

            <div style="width: 50%; float: right;">
                <h3 style="font-weight: bold;">Privacy Policy</h3>
                <p>{{ $invoice['policy'] }}</p>
            </div>
            <div style="clear: both;"></div>
        </div>

        <div style="margin-top: 5rem; position: relative">
            <p style="float: left;">Thank you for shopping from Autoworx</p>

            <div style="float: left; width: 30%; margin-left: 2rem; text-align: center;">
                <p>{{ $invoice['salesperson'] }}</p>
                <div style="border: 1px dotted #000000; width: 100%;"></div>
                <p>Salesperson</p>
            </div>

            <div style="float: right; width: 30%; text-align: center; position: relative; top: 15px; ">
                <div style="border: 1px dotted #000000; width: 100%;"></div>
                <p>Authorized Sign</p>
            </div>
            <div style="clear: both;"></div>
        </div>
</body>

</html>
