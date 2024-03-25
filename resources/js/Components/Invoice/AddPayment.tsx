import { usePopupStore } from "@/stores/popup";
import Popup from "../Popup";
import { useInvoiceStore } from "@/stores/invoice";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function AddPayment() {
  const { close } = usePopupStore();
  const { pricing, addPayment } = useInvoiceStore();

  const [type, setType] = useState<"Payment" | "Refund" | "Deposit">("Payment");
  const [amount, setAmount] = useState(pricing.deposit);
  const [method, setMethod] = useState<"Cash" | "Card" | "Zelle">("Cash");
  const [note, setNote] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addPayment({
      amount,
      method,
      note,
      type,
    });
    close();
  };

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Payment</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border rounded-md p-2"
            >
              <option value="Payment">Payment</option>
              <option value="Deposit">Deposit</option>
              <option value="Refund">Refund</option>
            </select>
          </div>

          <div className="mt-2">
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full border p-2 rounded-md"
              placeholder="Amount"
            />
          </div>

          <div className="mt-2">
            <select
              name="method"
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              className="w-full border rounded-md p-2"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Zelle">Zelle</option>
            </select>
          </div>

          <div className="mt-2">
            <textarea
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border p-2 rounded-md"
              placeholder="Note"
            />
          </div>

          <button
            className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-md active:scale-95 mx-auto block"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Popup>
  );
}
