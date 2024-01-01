import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { TaskType } from "@/types/task";
import moment from "moment";

export default function Week() {
  const { open } = usePopupStore();
  const { tasks } = useTaskStore();

  // Get the current date
  const today = new Date();

  // Define the days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Generate the all-day row
  const allDayRow = [
    "All Day",
    // Generate the days of the week with the date
    ...Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      return `${days[date.getDay()]} ${date.getDate()}`;
    }),
  ];

  // Generate the hourly rows
  const hourlyRows = Array.from({ length: 24 }, (_, i) => [
    `${i + 1 > 12 ? i + 1 - 12 : i + 1} ${i + 1 >= 12 ? "AM" : "PM"}`,
    // empty cells
    ...Array.from({ length: 7 }),
  ]);

  // Format the date
  function formatDate(date: Date) {
    return moment(date).format("YYYY-MM-DD");
  }

  // Format the time
  function formatTime(row: string) {
    const [hour, period] = row.split(" ");
    const time = `${hour.padStart(2, "0")}:00 ${period}`;
    return moment(time, "hh:mm A").format("HH:mm");
  }

  // Combine the all-day row and the hourly rows into a single array
  const rows = [allDayRow, ...hourlyRows];

  // Get the start and end of the current week
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();

  // Filter out the tasks that are within the current week
  const weekTasks = tasks
    .filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    })
    .map((task) => {
      const taskDate = new Date(task.date);
      const columnIndex = taskDate.getDay() - startOfWeek.getDay();

      // Convert the taskStartTime and taskEndTime to a format like "1 PM" or "11 AM"
      const taskStartTime = moment(task.start_time, "HH:mm").format("h A");
      const taskEndTime = moment(task.end_time, "HH:mm").format("h A");

      console.log("Task Start Time: ", taskStartTime);
      console.log("Task End Time: ", taskEndTime);

      // Find the rowStartIndex and rowEndIndex by looping over the hourlyRows
      const rowStartIndex = hourlyRows.findIndex((row) =>
        row.includes(taskStartTime)
      );
      const rowEndIndex = hourlyRows.findIndex((row) =>
        row.includes(taskEndTime)
      );

      return { ...task, columnIndex, rowStartIndex, rowEndIndex };
    });

  console.log("Week Tasks: ", weekTasks);

  return (
    <div className="relative border-[#797979] w-[1116px] border-l border-t border-b h-[90%] mt-3 overflow-scroll">
      {rows.map((row: any, rowIndex: number) => (
        <div
          className={cn(
            "flex h-[45px] border-[#797979]",
            rowIndex !== rows.length - 1 && "border-b"
          )}
          key={rowIndex}
        >
          {row.map((column: any, columnIndex: number) => {
            const isHeaderCell = columnIndex === 0 || rowIndex === 0;
            const cellWidth =
              columnIndex === 0
                ? "min-w-[100px] max-w-[100px]"
                : "min-w-[145px] max-w-[145px]";
            const fontSize =
              rowIndex === 0 ? "font-bold text-[19px]" : "text-[17px]";
            const cellClasses = cn(
              "border-r border-[#797979] h-full text-[#797979] flex justify-center items-center",
              cellWidth,
              fontSize
            );

            function handleClick() {
              const date = formatDate(
                new Date(
                  today.setDate(
                    today.getDate() - today.getDay() + columnIndex - 1
                  )
                )
              );
              const start_time = formatTime(row[0]);
              open("ADD_TASK", { date, start_time });
            }

            return (
              <button
                key={columnIndex}
                className={cellClasses}
                disabled={isHeaderCell}
                onClick={isHeaderCell ? undefined : handleClick}
              >
                {column}
              </button>
            );
          })}
        </div>
      ))}

      {weekTasks.map((task) => {
        const left = `${145 * task.columnIndex + 100}px`;
        const top = `${45 * task.rowStartIndex + 45}px`;
        const height = `${45 * (task.rowEndIndex - task.rowStartIndex + 1)}px`;
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
            className={`border text-white absolute p-1 rounded-lg text-[17px] top-0 z-10`}
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
