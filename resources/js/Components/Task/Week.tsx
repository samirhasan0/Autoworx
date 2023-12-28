import { cn } from "@/lib/cn";

export default function Week() {
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

  // Combine the all-day row and the hourly rows into a single array
  const rows = [allDayRow, ...hourlyRows];

  return (
    <div className="border-[#797979] border-l border-t border-b h-[90%] mt-3 overflow-scroll">
      {rows.map((row, rowIndex) => (
        <div
          className={cn(
            "flex h-[45px] border-[#797979]",
            rowIndex !== rows.length - 1 && "border-b"
          )}
          key={rowIndex}
        >
          {row.map((column: any, columnIndex) => (
            <div
              key={columnIndex}
              className={cn(
                "border-r border-[#797979] h-full text-[#797979]  flex justify-center items-center",
                columnIndex === 0 ? "w-[100px]" : "w-[150px]",
                rowIndex === 0 ? "font-bold text-[19px]" : "text-[17px]"
              )}
            >
              {column}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
