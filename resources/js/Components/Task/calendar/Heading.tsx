import { cn } from "@/lib/cn";
import { useCalenderTypeStore } from "@/stores/calenderType";
import moment from "moment";

export default function Heading() {
  const { calenderType, setCalenderType } = useCalenderTypeStore();

  return (
    <div className="flex justify-between items-center">
      {/* Month name */}
      <h2 className="font-bold ml-2 text-[#797979] text-[26px] max-[1300px]:text-[20px]">
        {/* If day is selected, then : Day, Month year */}
        {/* else: Month year */}
        {calenderType === "DAY"
          ? moment().format("dddd, MMMM YYYY")
          : moment().format("MMMM YYYY")}
      </h2>

      {/* Calender type selector */}
      <div className="flex items-center justify-center w-[263px] h-[42px] rounded-[6px] bg-[#D9D9D9] calender-time-shadow gap-2 max-[1300px]:w-[210px]">
        <button
          className={cn(
            "text-[#797979] text-[19px] w-[78px] h-[34px] rounded-[4px] max-[1300px]:w-[60px] max-[1300px]:h-[30px] max-[1300px]:text-[17px]",
            calenderType === "DAY" && "bg-white"
          )}
          onClick={() => setCalenderType("DAY")}
        >
          Day
        </button>
        <button
          className={cn(
            "text-[#797979] text-[19px] w-[78px] h-[34px] rounded-[4px] max-[1300px]:w-[60px] max-[1300px]:h-[30px] max-[1300px]:text-[17px]",
            calenderType === "WEEK" && "bg-white"
          )}
          onClick={() => setCalenderType("WEEK")}
        >
          Week
        </button>
        <button
          className={cn(
            "text-[#797979] text-[19px] w-[78px] h-[34px] rounded-[4px] max-[1300px]:w-[60px] max-[1300px]:h-[30px] max-[1300px]:text-[17px]",
            calenderType === "MONTH" && "bg-white"
          )}
          onClick={() => setCalenderType("MONTH")}
        >
          Month
        </button>
      </div>
    </div>
  );
}
