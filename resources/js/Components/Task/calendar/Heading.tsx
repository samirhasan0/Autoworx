import { cn } from "@/lib/cn";
import { useCalenderTypeStore } from "@/stores/calenderType";
import moment from "moment";

export default function Heading() {
  const { calenderType, setCalenderType } = useCalenderTypeStore();

  return (
    <div className="flex justify-between items-center">
      {/* Month name */}
      <h2 className="font-bold ml-2 text-[#797979] text-[26px]">
        {/* If day is selected, then : Day, Month year */}
        {/* else: Month year */}
        {calenderType === "DAY"
          ? moment().format("dddd, MMMM YYYY")
          : moment().format("MMMM YYYY")}
      </h2>

      {/* Calender type selector */}
      <div className="flex items-center justify-center w-[263px] h-[42px] rounded-[6px] bg-[#D9D9D9] calender-time-shadow gap-2">
        <button
          className={cn(
            "text-[#797979] text-[19px] w-[78px] h-[34px] rounded-[4px]",
            calenderType === "DAY" && "bg-white"
          )}
          onClick={() => setCalenderType("DAY")}
        >
          Day
        </button>
        <button
          className={cn(
            "text-[#797979] text-[19px] w-[78px] h-[34px] rounded-[4px]",
            calenderType === "WEEK" && "bg-white"
          )}
          onClick={() => setCalenderType("WEEK")}
        >
          Week
        </button>
        <button
          className={cn(
            "text-[#797979] text-[19px] w-[78px] h-[34px] rounded-[4px]",
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
