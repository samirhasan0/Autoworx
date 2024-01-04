import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { useUsersStore } from "@/stores/users";
import { TaskType } from "@/types/task";
import moment from "moment";
import { useState } from "react";
import { HiCalendar, HiClock } from "react-icons/hi";

export default function Day() {
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  const { open } = usePopupStore();
  const { tasks } = useTaskStore();
  const { users } = useUsersStore();

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
    <>
      <div
        className={cn(
          "relative border-[#797979] border h-[90%] mt-3 overflow-auto",
          // turn off the scroll
          hoveredTask && "overflow-hidden"
        )}
      >
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
        {dayTasks.map((task, index) => {
          console.log("Start: ", task.rowStartIndex);
          console.log("End: ", task.rowEndIndex);

          const left = "130px";
          const top = `${task.rowStartIndex * 45}px`;
          const height = `${
            (task.rowEndIndex - task.rowStartIndex + 1) * 45
          }px`;
          const width = "500px";
          const backgroundColor = TASK_COLOR[task.type];

          // Define a function to truncate the task title based on the height
          const truncateTitle = (title: string, maxLength: number) => {
            return title.length > maxLength
              ? title.slice(0, maxLength) + "..."
              : title;
          };

          // Define the maximum title length based on the height
          const maxTitleLength =
            height === "45px"
              ? 60
              : height === "90px"
              ? 120
              : task.title.length;

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
              onMouseEnter={() => setHoveredTask(index)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              {truncateTitle(task.title, maxTitleLength)}
            </div>
          );
        })}
      </div>

      {dayTasks.map((task, index) => {
        const MOVE_FROM_TOP = 70;
        const height = 300;
        const left = "130px";
        const top = `${task.rowStartIndex * 45 + MOVE_FROM_TOP - height}px`;

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

            {/* Show users */}
            <div className="mt-3 h-[12rem] overflow-auto">
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
