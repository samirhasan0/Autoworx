import { Link, usePage } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function TempDisplay() {
  const { props } = usePage();
  const { invoices } = props as any;

  return (
    <div className="mt-5 mb-10 app-shadow w-full">
      <table className="w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice ID
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
              Client ID
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
              Email
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
              Price
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
              Date
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>

            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[50px]">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice: any) => (
            <tr
              key={invoice.invoice_id}
              className="max-[1600px]:text-sm max-[1500px]:text-xs"
            >
              <td className="px-2 py-4 text-[#6571FF]">
                <Link href={`/invoice/${invoice.invoice_id}`}>
                  {invoice.invoice_id}
                </Link>
              </td>
              <td className="px-2 py-4">{invoice.customer_id}</td>
              <td className="px-2 py-4">{invoice.customer_name}</td>
              <td className="px-2 py-4">{invoice.vehicle_model}</td>
              <td className="px-2 py-4">{invoice.customer_email}</td>
              <td className="px-2 py-4">$ {invoice.grand_total}</td>
              <td className="px-2 py-4">
                {moment(invoice.issue_date).format("DD.MM.YYYY")}
              </td>
              <td className="px-2 py-4">{invoice.status}</td>
              <td className="px-2 py-4">
                <Link
                  href={`/invoice/${invoice.invoice_id}/edit`}
                  className="text-blue-500"
                >
                  <img
                    src="/icons/Edit.svg"
                    alt="edit"
                    className="h-5 max-[1600px]:h-4 max-[1500px]:h-3"
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
