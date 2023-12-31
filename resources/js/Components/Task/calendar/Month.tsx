import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { TaskType } from "@/types/task";
import moment from "moment";

export default function Month({ tasks }: { tasks: TaskType[] }) {
  const { open } = usePopupStore();

  // Initialize an array to hold the dates
  const dates: [number, TaskType[] | undefined][] = [];
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
    dates.push([date.getDate(), tasks]);
  }

  // Reverse the dates array to get the dates in ascending order
  dates.reverse();

  // Add today's date to the dates array
  dates.push([today.getDate(), getTasks(today)]);

  // Calculate the number of dates to be generated after today
  let rest = totalDates - todayIndex - 1;

  // Generate the dates after today
  for (let index = 0; index < rest; index++) {
    // Calculate the date number
    let dateNumber = today.getDate() + index + 1;
    // Create a new date object
    const date = new Date(today.getFullYear(), today.getMonth(), dateNumber);
    // Add the date to the dates array
    dates.push([date.getDate(), getTasks(date)]);
  }

  function getTasks(date: Date) {
    return tasks.filter((task) => {
      return new Date(task.date).getDate() === date.getDate();
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
                className="border-b border-r border-[#797979] text-[#797979] flex p-2 w-[160px] font-bold h-[50px] text-[17px] justify-center"
              >
                {cell}
              </div>
            );

          return (
            <button
              key={i}
              className={cn(
                "border-b border-r border-[#797979] flex flex-col items-end p-2 w-[160px] h-[115.5px] text-[23px] font-bold gap-2",
                // check if the cell is today
                today.getDate() === cell[0]
                  ? "text-[#6571FF]"
                  : "text-[#797979]"
              )}
              onClick={() => {
                open("ADD_TASK", {
                  // TODO: Fix the date format
                  // date: `${today.getFullYear()}-${today.getMonth() + 1}-${
                  //   // Add a zero to the date if it is less than 10
                  //   cell[0] < 10 ? "0" + cell[0] : cell[0]
                  // }`,
                  //*********************//
                  // date: moment(
                  //   new Date(today.getFullYear(), today.getMonth(), cell[0])
                  // ).format("YYYY-MM-DD"),
                });
              }}
            >
              {cell[0]}
              <div className="flex flex-row gap-5">
                {cell[1]?.map((task: TaskType, i: number) => (
                  <div
                    key={i}
                    className="w-[20px] h-[20px] rounded-full"
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
