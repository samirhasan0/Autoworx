import { useInvoiceStore } from "@/stores/invoice";
import { usePopupStore } from "@/stores/popup";
import { Pricing } from "@/types/invoice";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function Payment() {
  const { open } = usePopupStore();
  const { payments, removePayment, pricing, setPricing } = useInvoiceStore();
  const { props } = usePage();
  const { errors } = props as any;

  useEffect(() => {
    // calculate only diposit payments (type === "Deposit")
    const deposit = payments.reduce((acc, payment) => {
      if (payment.type === "Deposit") {
        return acc + payment.amount;
      }
      return acc;
    }, 0);

    setPricing({ ...pricing, deposit: deposit });
  }, [payments]);

  return (
    <div className="app-shadow w-full h-[25%] rounded-xl p-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="uppercase text-black font-bold text-sm">
          Payment Order
        </h2>
        <button
          className="bg-[#4DB6AC] px-7 py-2 text-white rounded-md text-sm"
          onClick={() => open("ADD_PAYMENT")}
        >
          Payment
        </button>
      </div>

      {/* Table */}
      <div className="h-24 overflow-scroll mt-3">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-xs text-white uppercase flex gap-1">
              <th className="text-left bg-[#6571FF] w-[150px] p-2">
                Billing By
              </th>
              <th className="text-left bg-[#6571FF] w-[360px] p-2">
                Billing Info
              </th>
              <th className="text-left bg-[#6571FF] w-[360px] p-2">Note</th>
              <th className="text-left bg-[#6571FF] w-[150px] p-2">Amount</th>
            </tr>
          </thead>

          {errors.payments && payments.length <= 0 && (
            <p className="text-red-500 text-lg text-center mt-1">
              Payment is required
            </p>
          )}

          <tbody>
            {payments.map((payment, index) => {
              const isEven = index % 2 === 0;
              const bgColor = !isEven ? "bg-[#F4F4F4]" : "bg-[$EAEAEA]";

              return (
                <tr className="text-sm text-black flex gap-1">
                  <td className={`text-left ${bgColor} p-2 w-[150px]`}>
                    <p>
                      <span className="font-bold">TNX: </span>
                      <span>{payment.tnx}</span>
                    </p>
                    <p>
                      <span className="font-bold">Method: </span>
                      <span>{payment.method}</span>
                    </p>
                    <p>
                      <span className="font-bold">Date: </span>
                      <span>{moment(payment.date).format("DD MMM, YYYY")}</span>
                    </p>
                  </td>
                  <td className={`text-left ${bgColor} p-2 w-[360px]`}>
                    {/* name, mobile, email */}
                    <p>
                      <span className="font-bold">Name: </span>
                      <span>{payment.name}</span>
                    </p>
                    <p>
                      <span className="font-bold">Mobile: </span>
                      <span>{payment.mobile}</span>
                    </p>
                    <p>
                      <span className="font-bold">Email: </span>
                      <span>{payment.email}</span>
                    </p>
                  </td>
                  <td className={`text-left ${bgColor} p-2 w-[360px]`}>
                    {/* type, address, note */}
                    <p>
                      <span className="font-bold">Type: </span>
                      <span>{payment.type}</span>
                    </p>
                    <p>
                      <span className="font-bold">Address: </span>
                      <span>{payment.address}</span>
                    </p>
                    <p>
                      <span className="font-bold">Note: </span>
                      <span>{payment.note}</span>
                    </p>
                  </td>
                  <td className={`text-left ${bgColor} p-2 w-[150px]`}>
                    {/* amount, status, delete button */}
                    <p>
                      <span className="font-bold">Amount: </span>
                      <span>{payment.amount}</span>
                    </p>
                    <p>
                      <span className="font-bold">Status: </span>
                      <span>{payment.status}</span>
                    </p>
                    <button
                      className="text-white p-1 px-3 rounded-md bg-red-500 text-xs flex items-center font-bold gap-2"
                      onClick={() => removePayment(payment.tnx!)}
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
