import ServiceSearch from "./ServiceSearch";
import Services from "./Services";
import AdditionalInfo from "./AdditionalInfo";
import { useInvoiceStore } from "@/stores/invoice";
import { Status } from "@/types/invoice";
import OrderButton from "./OrderButton";
import { useEffect, useState } from "react";

export default function ServiceSection() {
  const {
    pricing,
    setPricing,
    status,
    setStatus,
    sendMail,
    setSendMail,
    services,
    payments,
    photo,
    setPhoto,
  } = useInvoiceStore();

  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "AMOUNT">(
    "PERCENTAGE"
  );

  useEffect(() => {
    // subtotal would be the sum of all services
    // const subtotal = services.reduce((acc, service) => acc + service.total, 0);
    // cast to number and then sum
    const subtotal = services
      .map((service) => Number(service.total))
      .reduce((acc, total) => acc + total, 0);
    let gt;

    // calculate grand total with tax
    if (pricing.tax > 0) {
      gt = subtotal + subtotal * (pricing.tax / 100);
    } else {
      gt = subtotal;
    }

    // calculate grand total with discount
    if (discountType === "PERCENTAGE") {
      gt = gt - subtotal * ((pricing.discount ? pricing.discount : 0) / 100);
    } else {
      gt = gt - (pricing.discount ? pricing.discount : 0);
    }

    // calculate due
    const due = gt - (pricing.deposit ? pricing.deposit : 0);

    console.log("Calculation done!");
    console.log("Grand Total: ", gt);
    console.log("Due: ", due);
    console.log("Pricing: ", pricing);

    setPricing({
      ...pricing,
      subtotal,
      grand_total: gt,
      due,
    });
  }, [
    services,
    payments,
    pricing.subtotal,
    pricing.discount,
    pricing.tax,
    pricing.deposit,
    discountType,
  ]);

  console.log("pricing: ", pricing);

  return (
    <div className="h-[76%] w-full app-shadow rounded-xl p-3">
      <ServiceSearch />
      <Services />

      {/* Attachments */}
      <div className="h-40 mt-3 flex gap-4 attach">
        {/* Photo selector */}
        {/* TODO */}
        <div className="w-[75%] h-full invoice-inner-shadow bg-[#EFEFEF] flex items-center justify-center flex-col relative max-[1700px]:w-[65%]">
          <p className="text-[#797979] text-[75px] font-normal">+</p>
          <p className="text-[#797979] relative bottom-8 text-xl">
            {photo ? photo.name : "Click to attach photo/document"}
          </p>
          <input
            type="file"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            onChange={(e) =>
              setPhoto(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        {/* Info */}
        <div className="flex w-[20%] relative max-[1700px]:w-[35%]">
          {/* Titles */}
          <div className="w-[50%] flex flex-col uppercase font-bold text-black text-[12px]">
            <h2 className="bg-[#EAEAEA] p-1">Subtotal</h2>
            <h2 className="bg-[#EAEAEA] p-1 mt-[1px]">Discount</h2>
            <h2 className="bg-[#EAEAEA] p-1 mt-[1px]">Tax</h2>
            <h2 className="bg-[#EAEAEA] p-1 mt-[1px]">Grand Total</h2>
            <h2 className="bg-[#EAEAEA] p-1 mt-[1px]">Deposit</h2>
            <h2 className="bg-[#EAEAEA] p-1 mt-[1px]">Due</h2>
          </div>
          {/* Values */}
          <div className="w-[50%] flex flex-col text-[12px]">
            <input
              type="number"
              className="bg-[#F4F4F4] px-1 py-[5px] text-xs border-none"
              value={pricing.subtotal}
              disabled
            />

            <div className="w-full flex">
              <input
                type="number"
                className="bg-[#F4F4F4] px-1 py-[5px] mt-[1px] text-xs border-none w-[60%]"
                value={pricing.discount}
                onChange={(e) =>
                  setPricing({ ...pricing, discount: parseInt(e.target.value) })
                }
              />
              <select
                name="discount_type"
                id="discount_type"
                className="bg-[#F4F4F4] px-1 py-[5px] text-xs border-none w-[40%]"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
              >
                <option value="PERCENTAGE">%</option>
                <option value="AMOUNT">$</option>
              </select>
            </div>

            <input
              type="number"
              className="bg-[#F4F4F4] px-1 py-[5px] mt-[1px] text-xs border-none"
              value={pricing.tax}
              onChange={(e) =>
                setPricing({ ...pricing, tax: parseFloat(e.target.value) })
              }
            />
            <input
              type="number"
              className="bg-[#F4F4F4] px-1 py-[5px] mt-[1px] text-xs border-none"
              value={pricing.grand_total}
              disabled
            />
            <input
              type="number"
              className="bg-[#F4F4F4] px-1 py-[5px] mt-[1px] text-xs border-none"
              value={pricing.deposit}
              onChange={(e) =>
                setPricing({ ...pricing, deposit: parseFloat(e.target.value) })
              }
            />
            <input
              type="number"
              className="bg-[#F4F4F4] px-1 py-[5px] mt-[1px] text-xs border-none"
              value={pricing.due}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Notes, Terms, Policy, Create order */}
      <div className="flex flex-row gap-4 mt-3">
        <AdditionalInfo />
        {/* Create order button */}
        <div className="w-[23%] service-form">
          {/* Select Status */}
          <select
            name="status"
            id="status"
            className="w-full h-7 p-1 px-2 text-black app-shadow rounded-md border-none text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="Consultations">Consultations</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Progress">In progress</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Pending">Pending</option>
            <option value="No show">No Show</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Checkbox */}
          <div className="flex items-center gap-2 mt-2 checkbox">
            <input
              type="checkbox"
              name="send-email"
              id="send-email"
              className="h-4 w-4 rounded-sm app-shadow border-none bg-[#F4F4F4] text-[#03A7A2]"
              checked={sendMail}
              onChange={(e) => setSendMail(e.target.checked)}
            />
            <label htmlFor="send-email">Send Email</label>
          </div>

          <OrderButton />
        </div>
        <div></div>
      </div>
    </div>
  );
}
