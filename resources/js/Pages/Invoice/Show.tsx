import Header from "@/Components/Invoice/show/Header";
import Invoice from "@/Components/Invoice/show/Invoice";
import WorkOrder from "@/Components/Invoice/show/WorkOrder";

export default function Show() {
  return (
    <div>
      <Header />

      <div className="flex gap-7 flex-row max-[1500px]:flex-col max-[1500px]:gap-0 max-[1500px]:items-center">
        <Invoice />
        <WorkOrder />
      </div>
    </div>
  );
}
