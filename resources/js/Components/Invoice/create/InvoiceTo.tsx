import { useInvoiceStore } from "@/stores/invoice";
import { usePopupStore } from "@/stores/popup";
import { usePage } from "@inertiajs/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function InvoiceTo() {
  const { props } = usePage();
  const { auth, errors } = props as any;
  const { invoiceId, customer, setCustomer, issueDate, setIssueDate } =
    useInvoiceStore();
  const { open } = usePopupStore();

  return (
    <div className="h-[63%] w-full app-shadow rounded-xl p-3 invoice-to">
      <div className="flex justify-between items-center form-head">
        <h2 className="uppercase text-black font-bold text-sm">Invoice to</h2>
        <button
          className="bg-[#4DB6AC] px-7 py-2 text-white rounded-md text-xs"
          onClick={() => open("ADD_CUSTOMER")}
        >
          <FaPlus />
        </button>
      </div>

      <form className="flex flex-row gap-3 mt-5 w-full form">
        <div className="flex flex-col gap-4 text-black text-sm w-[30%] form-divide">
          <label htmlFor="sales-person">Salesperson:</label>
          <label htmlFor="invoice">Invoice ID:</label>
          <label htmlFor="date">Issue Date:</label>
          <label htmlFor="name">Name:</label>
          <label htmlFor="mobile">Mobile:</label>
          <label htmlFor="email">Email:</label>
          <label htmlFor="address">Address:</label>
        </div>

        <div className="flex flex-col gap-3 w-[70%] form-divide-input">
          <p className="text-black font-bold text-sm">{auth.user.name}</p>
          <p className="text-black font-bold text-sm">{invoiceId}</p>
          <input
            type="date"
            id="date"
            name="date"
            required
            placeholder="Issue Date"
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={
              // format date so it can be displayed in the input field
              new Date(issueDate).toISOString().split("T")[0]
            }
            onChange={(e) => setIssueDate(e.target.value as any)}
          />
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Name"
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />

          <input
            type="text"
            id="mobile"
            name="mobile"
            required
            placeholder="Mobile"
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={customer.mobile}
            onChange={(e) =>
              setCustomer({ ...customer, mobile: e.target.value })
            }
          />

          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          <input
            type="text"
            id="address"
            name="address"
            required
            placeholder="Address"
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
          <input
            type="text"
            id="city"
            name="city"
            required
            placeholder="City"
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
          />
          <div className="flex gap-3">
            <input
              type="text"
              id="state"
              name="state"
              required
              placeholder="State"
              className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs w-1/2"
              value={customer.state}
              onChange={(e) =>
                setCustomer({ ...customer, state: e.target.value })
              }
            />
            <input
              type="text"
              id="zip"
              name="zip"
              required
              placeholder="Zip"
              className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs w-1/2"
              value={customer.zip}
              onChange={(e) =>
                setCustomer({ ...customer, zip: e.target.value })
              }
            />
          </div>
        </div>
      </form>

      {errors.customer_name ||
      errors.customer_mobile ||
      errors.customer_email ||
      errors.customer_address ||
      errors.customer_city ||
      errors.customer_state ||
      errors.customer_zip ? (
        <p className="text-red-500 text-sm mt-3 text-center">
          Please fill in all the required fields.
        </p>
      ) : null}
    </div>
  );
}
