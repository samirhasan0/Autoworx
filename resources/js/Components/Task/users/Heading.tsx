import { cn } from "@/lib/cn";
import { useCalendarUserTypeStore } from "@/stores/calendarUserType";

export default function Heading() {
  const { calendarUserType, setCalendarUserType } = useCalendarUserTypeStore();

  return (
    <div className="flex items-center justify-center h-[42px] rounded-[6px] bg-[#D9D9D9] calender-time-shadow gap-2 p-2">
      <button
        className={cn(
          "text-[#797979] text-[19px] w-[134px] h-[34px] rounded-[4px] max-[1300px]:w-[90px] max-[1300px]:h-[30px] max-[1300px]:text-[17px]",
          calendarUserType === "USERS" && "bg-white"
        )}
        onClick={() => setCalendarUserType("USERS")}
      >
        Users
      </button>
      <button
        className={cn(
          "text-[#797979] text-[19px] w-[134px] h-[34px] rounded-[4px] max-[1300px]:w-[90px] max-[1300px]:h-[30px] max-[1300px]:text-[17px]",
          calendarUserType === "TASKS" && "bg-white"
        )}
        onClick={() => setCalendarUserType("TASKS")}
      >
        Tasks
      </button>
    </div>
  );
}
