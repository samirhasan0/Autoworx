import { FaTimes } from "react-icons/fa";
import Popup from "../Popup";
import { useState } from "react";
import { usePopupStore } from "@/stores/popup";
import { useForm, usePage } from "@inertiajs/react";
import { ThreeDots } from "react-loader-spinner";
import { CustomerType } from "@/types/invoice";
import { useInvoiceStore } from "@/stores/invoice";

export default function EditCustomer() {
  const { close, data } = usePopupStore();
  const {
    data: formData,
    setData,
    put,
    processing,
    errors,
  } = useForm({
    name: data.customer.name,
    email: data.customer.email,
    mobile: data.customer.mobile,
    address: data.customer.address,
    city: data.customer.city,
    state: data.customer.state,
    zip: data.customer.zip,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    put(route("customer.update", data.customer.id), {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Edit Customer</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              id="name"
              name="name"
              required
              value={formData.name}
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
              value={formData.email}
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
              value={formData.mobile}
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
              value={formData.address}
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
              value={formData.city}
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
              value={formData.state}
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
              value={formData.zip}
              onChange={(e) => setData("zip", e.target.value)}
              placeholder="Zip"
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>

          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md active:scale-95 mx-auto block"
            type="submit"
          >
            {processing ? (
              <ThreeDots color="#fff" height={20} width={40} />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </Popup>
  );
}
