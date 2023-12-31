import { useCalenderTypeStore } from "@/stores/calenderType";
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import { TaskType } from "@/types/task";

export default function Body({ tasks }: { tasks: TaskType[] }) {
  const { calenderType } = useCalenderTypeStore();

  if (calenderType === "DAY") return <Day tasks={tasks} />;
  if (calenderType === "WEEK") return <Week tasks={tasks} />;
  if (calenderType === "MONTH") return <Month tasks={tasks} />;
}
