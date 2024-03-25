import { FaTimes, FaPlus } from "react-icons/fa";
import Popup from "../Popup";
import { useForm, usePage } from "@inertiajs/react";
import { usePopupStore } from "@/stores/popup";
import { useEffect } from "react";

export default function AddWorkOrder() {
  const { props } = usePage();
  const { customer, vehicle, invoice, services, employees, work_orders } =
    props as any;
  const { data, close, open } = usePopupStore();
  const {
    delete: deleteEmployee,
    data: formData,
    setData,
  } = useForm({ employee_id: null });

  const id = data.id || work_orders[work_orders.length - 1].id;

  const employeesToDisplay = employees.filter((employee: any) => {
    return employee.work_order_id == id;
  });

  useEffect(() => {
    if (formData.employee_id) {
      deleteEmployee(
        route("work_orders.remove_employee", formData.employee_id)
      );
    }
  }, [formData.employee_id]);

  return (
    <Popup>
      <div className="px-2 py-3 w-[40rem]">
        {/* Header */}
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-3xl">Work Invoice</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-row justify-between items-start p-5">
          <div>
            <h3 className="font-bold">Invoice To:</h3>
            <p>{customer.name}</p>
            <p>{customer.mobile}</p>
            <p>{customer.email}</p>
          </div>

          <div>
            <h3 className="font-bold">Vehicle:</h3>
            <p>{vehicle.year}</p>
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>
            <p>{vehicle.vin}</p>
            <p>{vehicle.license}</p>
          </div>

          <div>
            <h3 className="font-bold">Invoice#{invoice.invoice_id}</h3>
            <p>{invoice.status}</p>
            {/* TODO: Vehicle drop date */}
            <p className="w-[200px] mt-1">{invoice.notes}</p>
          </div>
        </div>

        <div className="flex flex-row items-start">
          {/* Product Table */}
          <table className="w-full">
            <thead>
              <tr className="text-sm text-white uppercase flex justify-between gap-2 w-[350px]">
                <th className="text-left bg-[#6571FF] p-2 w-[250px]">
                  Product name & Description
                </th>
                <th className="text-left bg-[#6571FF] p-2 w-[100px]">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: any, index: number) => {
                const isEven = index % 2 === 0;
                const bgColor = isEven ? "bg-[#EAEAEA]" : "bg-[#F4F4F4]";

                return (
                  <tr className="text-lg text-black flex gap-2 justify-between w-[350px]">
                    <td className={`text-left ${bgColor} p-2 w-[250px]`}>
                      {service.name}
                    </td>
                    <td className={`text-left ${bgColor} p-2 w-[100px]`}>
                      {service.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Employee List */}
          <div>
            <h3 className="bg-[#6571FF] p-2 w-[200px] text-white font-bold uppercase text-center">
              Employee List
            </h3>

            <div className="flex flex-col items-center">
              {employeesToDisplay.map((employee: any, index: number) => {
                const isEven = index % 2 === 0;
                const bgColor = isEven ? "bg-[#EAEAEA]" : "bg-[#F4F4F4]";

                return (
                  <div
                    className={`${bgColor} w-[200px] p-2 flex items-center justify-between`}
                  >
                    <p>{employee.name}</p>
                    <button
                      className="text-red-500"
                      onClick={() => setData({ employee_id: employee.id })}
                    >
                      <FaTimes />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              className="bg-[#6571FF] text-white p-2 rounded-lg text-sm mx-auto mt-2 block"
              onClick={() => open("CHOOSE_EMPLOYEE", { id })}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <button
          className="bg-[#6571FF] text-white py-2 px-10 rounded-lg text-base mt-10 block mx-auto"
          onClick={close}
        >
          Save
        </button>
      </div>
    </Popup>
  );
}
