import { usePopupStore } from "@/stores/popup";
import { useForm, usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function WorkOrder() {
  const { props } = usePage();
  const { invoice, customer, work_orders } = props as any;
  const { open } = usePopupStore();
  const { delete: deleteWork } = useForm();

  const [navbar, setNavbar] = useState<"ACTIVE" | "ARCHIVED">("ACTIVE");

  const handleDelete = (id: number) => {
    deleteWork(route("work_orders.destroy", id));
  };

  return (
    <div className="mt-10 w-[35%] mb-10">
      {/* Navbar */}
      <div>
        <button
          className={`px-8 py-1 rounded-l-md border border-slate-300 ${
            navbar !== "ACTIVE" ? "bg-slate-300 text-black" : ""
          }`}
          onClick={() => setNavbar("ACTIVE")}
        >
          Active
        </button>
        <button
          className={`px-8 py-1 rounded-r-md border border-slate-300 ${
            navbar !== "ARCHIVED" ? "bg-slate-300 text-black" : ""
          }`}
          onClick={() => setNavbar("ARCHIVED")}
        >
          Archived
        </button>
      </div>

      {/* Active Work Orders */}
      {navbar === "ACTIVE" && (
        <div className="app-shadow w-full rounded-lg p-3">
          <div className="h-[300px] overflow-scroll">
            <table className="w-full table-fixed">
              <thead>
                <tr className="text-xs text-white uppercase flex justify-between gap-2">
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[40%]">
                    Customer name
                  </th>
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[25%]">
                    Status
                  </th>
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[20%]">
                    Date
                  </th>
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[20%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {work_orders
                  .filter((work: any) => work.active_status === "Active")
                  .map((work: any, index: number) => {
                    const isEven = index % 2 === 0;
                    const bgColor = !isEven ? "bg-[#F4F4F4]" : "bg-[#EAEAEA]";

                    return (
                      <tr className="text-xs text-black flex justify-between gap-2">
                        <td className={`text-left ${bgColor} p-2 w-[40%]`}>
                          {customer.name}
                        </td>
                        <td className={`text-left ${bgColor} p-2 w-[25%]`}>
                          {invoice.status}
                        </td>
                        <td className={`text-left ${bgColor} p-2 w-[20%]`}>
                          {moment(work.created_at).format("MMM DD, YYYY")}
                        </td>
                        <td
                          className={`text-sm text-center ${bgColor} p-2 w-[20%]`}
                        >
                          <button
                            className="text-blue-500 mr-3"
                            onClick={() =>
                              open("ADD_WORK_ORDER", { id: work.id })
                            }
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => handleDelete(work.id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <button
            className="bg-[#03A7A2] px-6 py-3 text-base text-white rounded-md mt-3 mx-auto block"
            onClick={() => open("CHOOSE_EMPLOYEE", { new: true })}
          >
            Create Work Order
          </button>
        </div>
      )}

      {/* Archived Work Orders */}
      {navbar === "ARCHIVED" && (
        <div className="app-shadow w-full rounded-lg p-3">
          <div className="h-[300px] overflow-scroll">
            <table className="w-full table-fixed">
              <thead>
                <tr className="text-xs text-white uppercase flex justify-between gap-2">
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[50%]">
                    Customer name
                  </th>
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[30%]">
                    Status
                  </th>
                  <th className="text-left bg-[#6571FF] p-2 uppercase w-[30%]">
                    Delete Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {work_orders
                  .filter((work: any) => work.active_status === "Archived")
                  .map((work: any, index: number) => {
                    const isEven = index % 2 === 0;
                    const bgColor = !isEven ? "bg-[#F4F4F4]" : "bg-[#EAEAEA]";

                    return (
                      <tr className="text-xs text-black flex justify-between gap-2">
                        <td className={`text-left ${bgColor} p-2 w-[50%]`}>
                          {customer.name}
                        </td>
                        <td className={`text-left ${bgColor} p-2 w-[30%]`}>
                          {invoice.status}
                        </td>
                        <td className={`text-left ${bgColor} p-2 w-[30%]`}>
                          {moment(work.deleted_at).format("MMM DD, YYYY")}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
