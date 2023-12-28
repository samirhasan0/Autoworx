import { cn } from "@/lib/cn";

export default function Month() {
  // Initialize an array to hold the dates
  const dates: number[] = [];
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
    // Add the date to the dates array
    dates.push(date.getDate());
  }

  // Reverse the dates array to get the dates in ascending order
  dates.reverse();

  // Add today's date to the dates array
  dates.push(today.getDate());

  // Calculate the number of dates to be generated after today
  let rest = totalDates - todayIndex - 1;

  // Generate the dates after today
  for (let index = 0; index < rest; index++) {
    // Calculate the date number
    let dateNumber = today.getDate() + index + 1;
    // Create a new date object
    const date = new Date(today.getFullYear(), today.getMonth(), dateNumber);
    // Add the date to the dates array
    dates.push(date.getDate());
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
        {cells.map((cell, i) => (
          <div
            className={cn(
              "border-b border-r border-[#797979] text-[#797979] flex p-2 w-[160px] font-bold",
              i < 7
                ? "h-[50px] text-[17px] justify-center"
                : "h-[115.5px] text-[23px] justify-end"
            )}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
