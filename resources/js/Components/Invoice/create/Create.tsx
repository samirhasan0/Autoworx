import InvoiceTo from "./InvoiceTo";
import Vehicle from "./Vehicle";
import ServiceSection from "./ServiceSection";
import Payment from "./Payment";

export default function Create() {
  return (
    <>
      <div className="w-[77vw] h-[80vh] rounded-xl bg-white text-[#66738C] app-shadow px-5 pt-8 pb-5 flex gap-5 invoice-create">
        <div className="w-[25%] h-full">
          <InvoiceTo />
          <Vehicle />
        </div>

        <div className="flex flex-col w-[75%] gap-2">
          <ServiceSection />
          <Payment />
        </div>
      </div>
    </>
  );
}
