import { FaTimes } from "react-icons/fa";
import Popup from "../Popup";
import { usePopupStore } from "@/stores/popup";
import { useForm } from "@inertiajs/react";
import { ThreeDots } from "react-loader-spinner";

export default function EditEmployee() {
  const { data, close } = usePopupStore();
  const {
    data: formData,
    setData,
    put,
    processing,
    errors,
    reset,
  } = useForm({
    name: data.employee.name,
    email: data.employee.email,
    phone: data.employee.phone,
    address: data.employee.address,
    city: data.employee.city,
    state: data.employee.state,
    zip: data.employee.zip,
    employee_type: data.employee.employee_type,
    employee_department: data.employee.employee_department,
    old_password: "",
    new_password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    put(route("employee.update", data.employee.id), {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Edit Employee</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
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
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>
          <div className="mt-2">
            <input
              type="email"
              className="w-full border p-2 rounded-md"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="Email"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              id="mobile"
              name="mobile"
              required
              value={formData.phone}
              onChange={(e) => setData("phone", e.target.value)}
              placeholder="Mobile"
            />
            {errors.phone && (
              <div className="text-red-500 text-sm">{errors.phone}</div>
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
              <div className="text-red-500 text-sm">{errors.address}</div>
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
              <div className="text-red-500 text-sm">{errors.city}</div>
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
              <div className="text-red-500 text-sm">{errors.state}</div>
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
            {errors.zip && (
              <div className="text-red-500 text-sm">{errors.zip}</div>
            )}
          </div>

          <div className="mt-2">
            <select
              className="w-full border p-2 rounded-md"
              id="employee_type"
              name="employee_type"
              required
              value={formData.employee_type}
              onChange={(e) => setData("employee_type", e.target.value)}
            >
              <option value="">Select Employee Type</option>
              <option value="Salary">Salary</option>
              <option value="Hourly">Hourly</option>
              <option value="Contract Based">Contract Based</option>
            </select>
          </div>

          <div className="mt-2">
            <select
              className="w-full border p-2 rounded-md"
              id="employee_department"
              name="employee_department"
              required
              value={formData.employee_department}
              onChange={(e) => setData("employee_department", e.target.value)}
            >
              <option value="">Select Employee Department</option>
              <option value="Sales">Sales</option>
              <option value="Management">Management</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div className="mt-2">
            <input
              type="password"
              id="old_password"
              name="old_password"
              className="w-full border p-2 rounded-md"
              value={formData.old_password}
              onChange={(e) => setData("old_password", e.target.value)}
              placeholder="Old Password"
            />
            {errors.old_password && (
              <div className="text-red-500 text-sm">{errors.old_password}</div>
            )}
          </div>

          <div className="mt-2">
            <input
              type="password"
              id="new_password"
              name="new_password"
              className="w-full border p-2 rounded-md"
              value={formData.new_password}
              onChange={(e) => setData("new_password", e.target.value)}
              placeholder="New Password"
            />
            {errors.new_password && (
              <div className="text-red-500 text-sm">{errors.new_password}</div>
            )}
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
