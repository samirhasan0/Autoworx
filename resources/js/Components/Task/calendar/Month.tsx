import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { TaskType } from "@/types/task";
import moment from "moment";

export default function Month() {
  const { open } = usePopupStore();
  const { tasks } = useTaskStore();

  // Initialize an array to hold the dates
  const dates: [Date, TaskType[] | undefined][] = [];
  // Define the total number of dates to be displayed
  const totalDates = 35;
  // Get the current date
  const today = new Date();

  // Get the index of today's date
  let todayIndex = today.getDate() - today.getDay() + 1;

  // Generate the dates before today
  for (let index = 0; index < todayIndex; index++) {
    // Calculate the date number
    let dateNumber = today.getDate() - index - 1;
    // Create a new date object
    const date = new Date(today.getFullYear(), today.getMonth(), dateNumber);
    const tasks = getTasks(date);
    // Add the date to the dates array
    dates.push([date, tasks]);
  }

  // Reverse the dates array to get the dates in ascending order
  dates.reverse();

  // Add today's date to the dates array
  dates.push([today, getTasks(today)]);

  // Calculate the number of dates to be generated after today
  let rest = totalDates - todayIndex - 1;

  // Generate the dates after today
  for (let index = 0; index < rest; index++) {
    // Calculate the date number
    let dateNumber = today.getDate() + index + 1;
    // Create a new date object
    const date = new Date(today.getFullYear(), today.getMonth(), dateNumber);
    // Add the date to the dates array
    dates.push([date, getTasks(date)]);
  }

  function getTasks(date: Date) {
    return tasks.filter((task) => {
      // return new Date(task.date).getDate() === date.getDate();
      return (
        new Date(task.date).getFullYear() === date.getFullYear() &&
        new Date(task.date).getMonth() === date.getMonth() &&
        new Date(task.date).getDate() === date.getDate()
      );
    });
  }

  const cells = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    ...dates,
  ];

  return (
    <div className="border-[#797979] border-l border-t h-[90%] mt-3">
      <div className="grid grid-cols-7">
        {cells.map((cell: any, i) => {
          if (i < 7)
            return (
              <div
                key={i}
                className="border-b border-r border-[#797979] text-[#797979] flex p-2 font-bold h-[50px] text-[17px] justify-center max-[1300px]:text-[15px] items-center max-[1150px]:text-[12px]"
              >
                {cell}
              </div>
            );

          return (
            <button
              key={i}
              className={cn(
                "border-b border-r border-[#797979] flex flex-col items-end p-2 h-[115.5px] text-[23px] font-bold gap-2 max-[1300px]:text-[17px]",
                // check if the cell is today
                today === cell[0] ? "text-[#6571FF]" : "text-[#797979]"
              )}
              onClick={() => {
                open("ADD_TASK", {
                  date: moment(cell[0]).format("YYYY-MM-DD"),
                });
              }}
            >
              {cell[0].getDate()}

              <div className="flex gap-4 justify-end flex-wrap">
                {cell[1]?.map((task: TaskType, i: number) => (
                  <div
                    key={i}
                    className="w-[20px] h-[20px] rounded-full max-[1300px]:w-[15px] max-[1300px]:h-[15px]"
                    style={{
                      backgroundColor: TASK_COLOR[task.type],
                    }}
                  ></div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
