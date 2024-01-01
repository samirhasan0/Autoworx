import { useCalenderTypeStore } from "@/stores/calenderType";
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import { TaskType } from "@/types/task";

export default function Body() {
  const { calenderType } = useCalenderTypeStore();

  if (calenderType === "DAY") return <Day />;
  if (calenderType === "WEEK") return <Week />;
  if (calenderType === "MONTH") return <Month />;
}
