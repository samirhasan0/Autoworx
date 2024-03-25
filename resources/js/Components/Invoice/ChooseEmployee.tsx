import { FaTimes } from "react-icons/fa";
import Popup from "../Popup";
import { usePopupStore } from "@/stores/popup";
import { useForm, usePage } from "@inertiajs/react";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

export default function ChooseEmployee() {
  const { props } = usePage();
  const { invoice, employees } = props as any;
  const { open, data, close } = usePopupStore();
  const {
    post,
    setData,
    put,
    data: formData,
  } = useForm({
    employee_id: "",
    invoice_id: "",
  });

  useEffect(() => {
    if (data.new) {
      if (formData.employee_id) {
        post(route("work_orders.store"), {
          onSuccess: () => {
            open("ADD_WORK_ORDER", { id: data.id });
          },
        });
      }
    } else {
      put(route("work_orders.update", data.id), {
        onSuccess: () => {
          open("ADD_WORK_ORDER", { id: data.id });
        },
      });
    }
  }, [formData]);

  const handleAddEmployee = async (employee: any) => {
    setData({
      employee_id: employee.id,
      invoice_id: invoice.id,
    });
  };

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Add Employee</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <div className="mt-5 flex gap-1 flex-col">
          {
            // only names
            employees.map((employee: any) => {
              console.log(employee);
              const isAssigned = employee.work_order_id;

              return (
                <button
                  key={employee.id}
                  className={cn(
                    "py-2 px-3 text-left hover:bg-gray-300 bg-gray-200 rounded-md",
                    isAssigned && "cursor-not-allowed"
                  )}
                  disabled={isAssigned}
                  onClick={() => handleAddEmployee(employee)}
                >
                  <p className="font-bold text-lg">{employee.name}</p>

                  {isAssigned && (
                    <p className="text-sm text-gray-500">Unavailable</p>
                  )}
                </button>
              );
            })
          }
        </div>
      </div>
    </Popup>
  );
}
