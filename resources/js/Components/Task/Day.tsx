import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { TaskType } from "@/types/task";
import moment from "moment";

export default function Day({ tasks }: { tasks: TaskType[] }) {
  const { open } = usePopupStore();

  const rows = [
    "All Day",
    // 1pm to 12am
    ...Array.from(
      { length: 24 },
      (_, i) =>
        `${i + 1 > 12 ? i + 1 - 12 : i + 1} ${i + 1 >= 12 ? "AM" : "PM"}`
    ),
  ];

  const dayTasks = tasks
    .filter((task) => {
      // return today's tasks
      const taskDate = new Date(task.date);
      const today = new Date();
      return taskDate.getDate() === today.getDate();
    })
    .map((task) => {
      const taskStartTime = moment(task.start_time, "HH:mm").format("h A");
      const taskEndTime = moment(task.end_time, "HH:mm").format("h A");

      // Find the rowStartIndex and rowEndIndex by looping through the rows array
      const rowStartIndex = rows.findIndex((row) => row === taskStartTime);
      const rowEndIndex = rows.findIndex((row) => row === taskEndTime);

      // Return the task with the rowStartIndex and rowEndIndex
      return { ...task, rowStartIndex, rowEndIndex };
    });

  function formatDate(date: Date) {
    return moment(date).format("YYYY-MM-DD");
  }

  function formatTime(row: string) {
    const [hour, period] = row.split(" ");
    const time = `${hour.padStart(2, "0")}:00 ${period}`;
    return moment(time, "hh:mm A").format("HH:mm");
  }

  return (
    <div className="relative border-[#797979] border h-[90%] mt-3 overflow-scroll">
      {rows.map((row, i) => (
        <button
          key={i}
          className={cn(
            "h-[45px] border-[#797979] block w-full",
            i !== rows.length - 1 && "border-b",
            i !== 0 && "cursor-pointer"
          )}
          onClick={() => {
            const date = formatDate(new Date());
            const start_time = formatTime(row);
            open("ADD_TASK", { date, start_time });
          }}
          disabled={i === 0}
        >
          {/* Row heading */}
          <div
            className={cn(
              "border-r border-[#797979] w-[100px] h-full text-[#797979] text-[19px] flex justify-center items-center",
              i === 0 && "font-bold"
            )}
          >
            {row}
          </div>
        </button>
      ))}

      {/* Tasks */}
      {dayTasks.map((task) => {
        const left = "130px";
        const top = `${task.rowStartIndex * 45}px`;
        const height = `${(task.rowEndIndex - task.rowStartIndex) * 45}px`;
        const width = "145px";
        const backgroundColor = TASK_COLOR[task.type];

        // Define a function to truncate the task title based on the height
        const truncateTitle = (title: string, maxLength: number) => {
          return title.length > maxLength
            ? title.slice(0, maxLength) + "..."
            : title;
        };

        // Define the maximum title length based on the height
        const maxTitleLength =
          height === "45px" ? 15 : height === "90px" ? 30 : task.title.length;

        return (
          <div
            key={task.id}
            className={`border text-white absolute px-2 py-1 rounded-lg text-[17px] top-0 z-10`}
            style={{
              left,
              top,
              height,
              backgroundColor,
              maxWidth: width,
              minWidth: width,
            }}
          >
            {truncateTitle(task.title, maxTitleLength)}
          </div>
        );
      })}
    </div>
  );
}
