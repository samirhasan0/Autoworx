import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { useUsersStore } from "@/stores/users";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
// import calendar and clock icons
import { HiCalendar, HiClock } from "react-icons/hi";
import { MdDelete, MdModeEdit } from "react-icons/md";

export default function Week() {
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const { delete: deleteTask } = useForm();

  const { open } = usePopupStore();
  const { tasks } = useTaskStore();
  const { users } = useUsersStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(scrollableDivRef.current!.scrollTop);
    };

    scrollableDivRef.current &&
      scrollableDivRef.current.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDivRef.current &&
        scrollableDivRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDelete = (id: number) => {
    deleteTask(route("task.destroy", id));
  };

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

  return (
    <>
      <div
        className="relative border-[#797979] border border-l border-t border-b h-[90%] mt-3 overflow-auto"
        ref={scrollableDivRef}
      >
        {rows.map((row: any, rowIndex: number) => (
          <div
            className={cn(
              "flex h-[45px] border-[#797979] overflow-hidden",
              rowIndex !== rows.length - 1 && "border-b"
            )}
            key={rowIndex}
          >
            {row.map((column: any, columnIndex: number) => {
              const isHeaderCell = columnIndex === 0 || rowIndex === 0;
              const cellWidth =
                columnIndex === 0
                  ? "min-w-[10%] max-w-[10%]"
                  : "min-w-[12.9%] max-w-[12.9%]";

              const fontSize =
                rowIndex === 0
                  ? "font-bold text-[19px] max-[1600px]:text-[15px]"
                  : "text-[17px] max-[1600px]:text-[13px]";
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

        {weekTasks.map((task, index) => {
          // const left = `${145 * task.columnIndex + 100}px`;
          // left according to the cell width
          const left = `calc(10% + 12.9% * ${task.columnIndex})`;
          const top = `${45 * task.rowStartIndex + 45}px`;
          const height = `${
            45 * (task.rowEndIndex - task.rowStartIndex + 1)
          }px`;
          // width according to the cell width
          const width = "12.9%";
          const backgroundColor = TASK_COLOR[task.type];

          // Define a function to truncate the task title based on the height
          const truncateTitle = (title: string, maxLength: number) => {
            return title.length > maxLength
              ? title.slice(0, maxLength) + "..."
              : title;
          };

          // TODO
          // Define the maximum title length based on the height
          const maxTitleLength =
            height === "45px" ? 13 : height === "90px" ? 30 : task.title.length;

          return (
            <div
              className="absolute top-0 rounded-lg border"
              style={{
                left,
                top,
                height,
                backgroundColor,
                width,
              }}
              key={index}
              onMouseEnter={() => setHoveredTask(index)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <p className="text-white p-1 text-[17px] z-30 max-[1600px]:text-[12px]">
                {truncateTitle(task.title, maxTitleLength)}
              </p>
            </div>
          );
        })}
      </div>

      {weekTasks.map((task, index) => {
        const isRow0 = task.rowStartIndex === 0;
        const MOVE_FROM_TOP = isRow0 ? 130 : 70;
        const height = 300;
        // const left = `${145 * task.columnIndex + 100 - 120}px`;
        // left according to the cell width
        const left = `calc(10% + 15% * ${task.columnIndex} - 120px)`;
        const top = `${
          45 * task.rowStartIndex + 45 - scrollPosition + MOVE_FROM_TOP - height
        }px`;

        return (
          <div
            className={cn(
              "absolute w-[400px] bg-white border border-slate-400 rounded-md p-3 transition-all duration-300"
            )}
            style={{
              left,
              top,
              height,
              opacity: hoveredTask === index ? 1 : 0,
              zIndex: hoveredTask === index ? 40 : -10,
            }}
            key={index}
            onMouseEnter={() => setHoveredTask(index)}
            onMouseLeave={() => setHoveredTask(null)}
          >
            <p className="font-bold text-[19px] text-slate-600">{task.title}</p>
            <hr />

            <div className="flex justify-between items-center mt-2">
              <p className="text-[17px] text-slate-600 flex items-center">
                <HiCalendar />
                {moment(task.date).format("MMM DD, YYYY")}
              </p>

              <p className="text-[17px] text-slate-600 flex items-center">
                <HiClock />
                {moment(task.start_time, "HH:mm").format("hh:mm A")}
                <span className="mx-1">-</span>
                <HiClock />
                {moment(task.end_time, "HH:mm").format("hh:mm A")}
              </p>
            </div>

            {/* Options */}
            <div className="flex justify-end text-[14px]">
              <button className="flex items-center bg-[#24a0ff] text-white py-1 px-2 rounded-md mt-2">
                <MdModeEdit />
                Edit
              </button>
              <button
                className="flex items-center bg-[#ff4d4f] text-white py-1 px-2 rounded-md mt-2 ml-2"
                onClick={() => handleDelete(task.id)}
              >
                <MdDelete />
                Delete
              </button>
            </div>

            {/* Show users */}
            <div className="mt-3 h-[10rem] overflow-auto">
              {task.assigned_users.map((user_id: number) => {
                const user = users.find((user) => user.id === user_id);
                if (!user) return null;
                return (
                  <div
                    className="flex items-center mt-2 bg-[#F8F9FA] py-3 px-1"
                    key={user.id}
                  >
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-[18px] font-bold text-slate-600 ml-2">
                      {user.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
