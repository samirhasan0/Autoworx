import Display from "@/Components/Invoice/Display";
import Title from "@/Components/Title";

export default function Index() {
  return (
    <div>
      <Title>Invoice</Title>
      <div className="flex justify-between gap-5 items-end">
        <div className="flex flex-col items-end h-[83vh]">
          <button className="py-2 px-8 text-[16px] bg-[#6571FF] rounded-[5px] text-white">
            New Invoice +
          </button>

          <Display />
        </div>

        <div className="w-[40vw] border h-[76vh] rounded-xl bg-white app-shadow p-3"></div>
      </div>
    </div>
  );
}
