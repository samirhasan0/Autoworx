import { cn } from "@/lib/cn";
import { useCalendarUserTypeStore } from "@/stores/calendarUserType";

export default function Heading() {
  const { calendarUserType, setCalendarUserType } = useCalendarUserTypeStore();

  return (
    <div className="flex items-center justify-center h-[42px] rounded-[6px] bg-[#D9D9D9] calender-time-shadow gap-2 p-2">
      <button
        className={cn(
          "text-[#797979] text-[19px] w-[134px] h-[34px] rounded-[4px]",
          calendarUserType === "USERS" && "bg-white"
        )}
        onClick={() => setCalendarUserType("USERS")}
      >
        Users
      </button>
      <button
        className={cn(
          "text-[#797979] text-[19px] w-[134px] h-[34px] rounded-[4px]",
          calendarUserType === "TASKS" && "bg-white"
        )}
        onClick={() => setCalendarUserType("TASKS")}
      >
        Tasks
      </button>
    </div>
  );
}
