import { FaTimes } from "react-icons/fa";
import Popup from "../Popup";
import { useState } from "react";
import { usePopupStore } from "@/stores/popup";
import { useForm, usePage } from "@inertiajs/react";
import { ThreeDots } from "react-loader-spinner";
import { CustomerType } from "@/types/invoice";
import { useInvoiceStore } from "@/stores/invoice";

export default function AddInvoice() {
  const [option, setOption] = useState<"EXISTING_CUSTOMER" | "NEW_CUSTOMER">(
    "EXISTING_CUSTOMER"
  );
  const { close } = usePopupStore();
  const { setCustomer } = useInvoiceStore();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const { props } = usePage();
  const customers = props.customers as CustomerType[];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route("customer.store"), {
      onSuccess: () => {
        setCustomer(data);
        close();
      },
    });
  };

  const addCustomer = (customer: any) => {
    setCustomer(customer);
    close();
  };

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Add Invoice</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <div className="mt-2 px-3 py-1">
          <div className="flex items-center">
            <button
              className={`px-2 py-1 rounded-md w-1/2 ${
                option === "EXISTING_CUSTOMER"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-gray-500"
              }`}
              onClick={() => setOption("EXISTING_CUSTOMER")}
            >
              Existing Customer
            </button>
            <button
              className={`px-2 py-1 rounded-md w-1/2 ${
                option === "NEW_CUSTOMER"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-gray-500"
              }`}
              onClick={() => setOption("NEW_CUSTOMER")}
            >
              New Customer
            </button>
          </div>

          {option === "EXISTING_CUSTOMER" && (
            <div>
              <div className="mt-2">
                <label className="block text-sm">Customer</label>
                <select className="w-full">
                  <option value="">Select Customer</option>
                  {customers.map((customer: any) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                      onClick={() => addCustomer(customer)}
                    >
                      {customer.name}
                      {` - ${customer.email}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {option === "NEW_CUSTOMER" && (
            <form onSubmit={handleSubmit}>
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  id="name"
                  name="name"
                  required
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  id="email"
                  name="email"
                  required
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  id="mobile"
                  name="mobile"
                  required
                  value={data.mobile}
                  onChange={(e) => setData("mobile", e.target.value)}
                  placeholder="Mobile"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">{errors.mobile}</p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full border p-2 rounded-md"
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  placeholder="Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="w-full border p-2 rounded-md"
                  value={data.city}
                  onChange={(e) => setData("city", e.target.value)}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  className="w-full border p-2 rounded-md"
                  value={data.state}
                  onChange={(e) => setData("state", e.target.value)}
                  placeholder="State"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  required
                  className="w-full border p-2 rounded-md"
                  value={data.zip}
                  onChange={(e) => setData("zip", e.target.value)}
                  placeholder="Zip"
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm">{errors.zip}</p>
                )}
              </div>

              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md active:scale-95 mx-auto block"
                type="submit"
              >
                {processing ? (
                  <ThreeDots color="#fff" height={20} width={40} />
                ) : (
                  "Add Customer"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Popup>
  );
}
