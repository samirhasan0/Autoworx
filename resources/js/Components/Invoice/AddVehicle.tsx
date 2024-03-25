import { useInvoiceStore } from "@/stores/invoice";
import { usePopupStore } from "@/stores/popup";
import { VehicleType } from "@/types/invoice";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Popup from "../Popup";
import { FaTimes } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

export default function AddVehicle() {
  const [option, setOption] = useState<"EXISTING_VEHICLE" | "NEW_VEHICLE">(
    "EXISTING_VEHICLE"
  );
  const { close } = usePopupStore();
  const { setVehicle } = useInvoiceStore();
  const { data, setData, post, processing, errors, reset } = useForm({
    make: "",
    model: "",
    year: "",
    vin: "",
    license: "",
  });
  const { props } = usePage();
  const vehicles = props.vehicles as VehicleType[];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route("vehicle.store"), {
      onSuccess: () => {
        setVehicle(data);
        close();
      },
    });
  };

  const addVehicle = (vehicle: any) => {
    setVehicle(vehicle);
    close();
  };

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Add Vehicle</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <div className="mt-2 px-3 py-1">
          <div className="flex items-center">
            <button
              className={`px-2 py-1 rounded-md w-1/2 ${
                option === "EXISTING_VEHICLE"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-gray-500"
              }`}
              onClick={() => setOption("EXISTING_VEHICLE")}
            >
              Existing Vehicle
            </button>
            <button
              className={`px-2 py-1 rounded-md w-1/2 ${
                option === "NEW_VEHICLE"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-gray-500"
              }`}
              onClick={() => setOption("NEW_VEHICLE")}
            >
              New Vehicle
            </button>
          </div>

          {option === "EXISTING_VEHICLE" && (
            <div className="mt-2">
              <label className="block text-sm">Vehicle</label>
              <select className="w-full">
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle, index) => (
                  <option
                    key={index}
                    onClick={() => addVehicle(vehicle)}
                    className="cursor-pointer hover:bg-slate-100 p-2"
                  >
                    {vehicle.model}
                  </option>
                ))}
              </select>
            </div>
          )}

          {option === "NEW_VEHICLE" && (
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Make"
                  className="border p-2 rounded-md"
                  value={data.make}
                  onChange={(e) => setData("make", e.target.value)}
                />
                {errors.make && (
                  <p className="text-red-500 text-sm">{errors.make}</p>
                )}
                <input
                  type="text"
                  placeholder="Model"
                  className="border p-2 rounded-md"
                  value={data.model}
                  onChange={(e) => setData("model", e.target.value)}
                />
                {errors.model && (
                  <p className="text-red-500 text-sm">{errors.model}</p>
                )}
                <input
                  type="number"
                  placeholder="Year"
                  className="border p-2 rounded-md"
                  value={data.year}
                  onChange={(e) => setData("year", e.target.value)}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year}</p>
                )}
                <input
                  type="text"
                  placeholder="VIN"
                  className="border p-2 rounded-md"
                  value={data.vin}
                  onChange={(e) => setData("vin", e.target.value)}
                />
                {errors.vin && (
                  <p className="text-red-500 text-sm">{errors.vin}</p>
                )}
                <input
                  type="text"
                  placeholder="License Plate"
                  className="border p-2 rounded-md"
                  value={data.license}
                  onChange={(e) => setData("license", e.target.value)}
                />
                {errors.license && (
                  <p className="text-red-500 text-sm">{errors.license}</p>
                )}
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white rounded-md p-2 mx-auto block"
              >
                {processing ? (
                  <ThreeDots color="#fff" height={20} width={40} />
                ) : (
                  "Add Vehicle"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Popup>
  );
}
