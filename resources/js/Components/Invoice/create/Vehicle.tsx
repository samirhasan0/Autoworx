import { useInvoiceStore } from "@/stores/invoice";
import { usePopupStore } from "@/stores/popup";
import { usePage } from "@inertiajs/react";
import { FaPlus } from "react-icons/fa";

export default function Vehicle() {
  const { open } = usePopupStore();
  const { vehicle, setVehicle } = useInvoiceStore();
  const { props } = usePage();
  const { errors } = props as any;

  return (
    <div className="h-[37%] w-full app-shadow rounded-xl p-3 vehicle">
      <div className="flex justify-between items-center form-head">
        <h2 className="uppercase text-black font-bold text-sm">
          Vehicle details
        </h2>
        <button
          className="bg-[#4DB6AC] px-7 py-2 text-white rounded-md text-xs"
          onClick={() => open("ADD_VEHICLE")}
        >
          <FaPlus />
        </button>
      </div>

      <form className="flex flex-row gap-3 mt-5 form">
        <div className="flex flex-col gap-4 text-black text-sm w-[30%] form-divide">
          <label htmlFor="sales-person">Year:</label>
          <label htmlFor="invoice">Make:</label>
          <label htmlFor="date">Model:</label>
          <label htmlFor="name">VIN:</label>
          <label htmlFor="mobile">License Plate:</label>
        </div>

        <div className="flex flex-col gap-3 w-[70%] form-divide-input">
          <input
            type="number"
            id="year"
            name="year"
            required
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={vehicle.year}
            onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
          />
          <input
            type="text"
            id="make"
            name="make"
            required
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={vehicle.make}
            onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
          />
          <input
            type="text"
            id="model"
            name="model"
            required
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={vehicle.model}
            onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          />
          <input
            type="text"
            id="vin"
            name="vin"
            required
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={vehicle.vin}
            onChange={(e) => setVehicle({ ...vehicle, vin: e.target.value })}
          />
          <input
            type="text"
            id="license"
            name="license"
            required
            className="text-black border-none app-shadow rounded-md p-1 px-3 text-xs"
            value={vehicle.license}
            onChange={(e) =>
              setVehicle({ ...vehicle, license: e.target.value })
            }
          />
        </div>
      </form>

      {errors.vehicle_year ||
      errors.vehicle_make ||
      errors.vehicle_model ||
      errors.vehicle_vin ||
      errors.vehicle_license ? (
        <p className="text-red-500 text-sm mt-2 text-center">
          Please fill all the fields
        </p>
      ) : null}
    </div>
  );
}
