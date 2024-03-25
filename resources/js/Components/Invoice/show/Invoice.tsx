import { usePage } from "@inertiajs/react";
import moment from "moment";

export default function Invoice() {
  const { props } = usePage();
  const { invoice, customer, settings, vehicle, services } = props as any;

  return (
    <div className="mt-3 p-7 app-shadow w-[65%] rounded-md bg-white mb-5 max-[1550px]:text-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        {/* Logo */}
        <img src="/icons/Logo2.png" alt="Autoworx" className="w-[100px]" />

        {/* Contact Info */}
        <div>
          <p className="font-bold uppercase">Contact Information</p>
          {/* Split and loop */}
          {settings.contact.split("||").map((info: string, index: number) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full bg-slate-300 h-1 my-3" />

      {/* Invoice details */}
      <div>
        <h1 className="text-3xl font-bold uppercase text-blue-700">Invoice</h1>

        <div className="flex justify-between items-start">
          {/* Invoice To */}
          <div className="mt-5">
            <h3 className="font-bold">Invoice To:</h3>
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.mobile}</p>
          </div>

          {/* Vehicle */}
          <div>
            <h3 className="font-bold">Vehicle Details:</h3>
            <div>
              <span className="font-bold">Year: </span>
              <span>{vehicle.year}</span>
            </div>
            <div>
              <span className="font-bold">Make: </span>
              <span>{vehicle.make}</span>
            </div>
            <div>
              <span className="font-bold">Model: </span>
              <span>{vehicle.model}</span>
            </div>
            <div>
              <span className="font-bold">VIN: </span>
              <span>{vehicle.vin}</span>
            </div>
            <div>
              <span className="font-bold">License Plate: </span>
              <span>{vehicle.license}</span>
            </div>
          </div>

          {/* Other info */}
          <div className="pr-20 max-[1550px]:pr-0">
            <div>
              <span className="font-bold">Invoice Number: </span>
              <span>{invoice.invoice_id}</span>
            </div>
            <div>
              <span className="font-bold">Invoice Date: </span>
              <span>
                {moment(invoice.created_at).format("MMM DD, YYYY hh:mm A")}
              </span>
            </div>
            <div>
              <span className="font-bold">Bill Status: </span>
              <span>Paid</span>
            </div>
            <div>
              <span className="font-bold">Order Status: </span>
              <span>{invoice.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product/Service info */}
      <div>
        <table className="w-full mt-10">
          <thead className="bg-gray-300">
            <tr>
              <th className="text-left px-4 py-2 border border-gray-400 w-[40%]">
                Product/Service
              </th>
              <th className="text-center px-4 py-2 border border-gray-400">
                Quantity/Unit
              </th>
              <th className="text-center px-4 py-2 border border-gray-400">
                Unit Price
              </th>
              <th className="text-center px-4 py-2 border border-gray-400">
                Discount Price
              </th>
              <th className="text-center px-4 py-2 border border-gray-400 w-[13%]">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: any, index: number) => (
              <tr key={index}>
                <td className="text-left px-4 py-2 border border-gray-400">
                  <div className="flex flex-col">
                    <p>{service.name}</p>
                    <p className="text-slate-700 text-sm">
                      {service.description}
                    </p>
                  </div>
                </td>

                <td className="text-center px-4 py-2 border border-gray-400">
                  {service.quantity}
                </td>

                <td className="text-center px-4 py-2 border border-gray-400">
                  ${service.price}
                </td>

                <td className="text-center px-4 py-2 border border-gray-400">
                  ${service.discount}
                </td>

                <td className="text-center px-4 py-2 border border-gray-400">
                  ${service.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pricing Calculation */}
        <div>
          {/* Subtotal */}
          <div className="flex w-full">
            <h3 className="border border-gray-400 px-4 py-2 w-[87%] text-end border-t-0">
              Subtotal
            </h3>
            <p className="w-[13%] border border-gray-400 px-4 py-2 border-t-0 border-l-0 text-center">
              ${invoice.subtotal}
            </p>
          </div>

          {/* Discount */}
          <div className="flex w-full">
            <h3 className="border border-gray-400 px-4 py-2 w-[87%] text-end border-t-0">
              Discount
            </h3>
            <p className="w-[13%] border border-gray-400 px-4 py-2 border-t-0 border-l-0 text-center">
              ${invoice.discount}
            </p>
          </div>

          {/* Tax */}
          <div className="flex w-full">
            <h3 className="border border-gray-400 px-4 py-2 w-[87%] text-end border-t-0">
              Tax
            </h3>
            <p className="w-[13%] border border-gray-400 px-4 py-2 border-t-0 border-l-0 text-center">
              ${invoice.tax}
            </p>
          </div>

          {/* Grand Total */}
          <div className="flex w-full">
            <h3 className="border border-gray-400 px-4 py-2 w-[87%] text-end border-t-0">
              Grand Total
            </h3>
            <p className="w-[13%] border border-gray-400 px-4 py-2 border-t-0 border-l-0 text-center">
              ${invoice.grand_total}
            </p>
          </div>

          {/* Deposit */}
          <div className="flex w-full">
            <h3 className="border border-gray-400 px-4 py-2 w-[87%] text-end border-t-0">
              Deposit
            </h3>
            <p className="w-[13%] border border-gray-400 px-4 py-2 border-t-0 border-l-0 text-center">
              ${invoice.deposit}
            </p>
          </div>

          {/* Due */}
          <div className="flex w-full">
            <h3 className="border border-gray-400 px-4 py-2 w-[87%] text-end border-t-0">
              Due
            </h3>
            <p className="w-[13%] border border-gray-400 px-4 py-2 border-t-0 border-l-0 text-center">
              ${invoice.due}
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Policy Conditions */}
      <div className="flex w-full gap-5 mt-10">
        {/* Terms */}
        <div className="w-1/2">
          <h3 className="font-bold">Terms & Conditions</h3>
          <p>{invoice.terms}</p>
        </div>

        {/* Policy */}
        <div className="w-1/2">
          <h3 className="font-bold">Privacy Policy</h3>
          <p>{invoice.policy}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 flex justify-between items-center">
        {/* Greetings */}
        <p>Thank you for shopping from Autoworx</p>

        {/* Salesperson */}
        <div className="flex flex-col items-center">
          <p>{invoice.salesperson}</p>
          <div className="border-dotted w-full border border-black"></div>
          <p>Salesperson</p>
        </div>

        {/* Signature */}
        <div>
          <div className="border-dotted w-full border border-black"></div>
          <p>Authorized Sign</p>
        </div>
      </div>
    </div>
  );
}
