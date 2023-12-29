import { cn } from "@/lib/cn";
import { usePopupStore } from "@/stores/popup";
import moment from "moment";

export default function Week() {
  const { open } = usePopupStore();

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

  return (
    <div className="border-[#797979] border-l border-t border-b h-[90%] mt-3 overflow-scroll">
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
            const cellWidth = columnIndex === 0 ? "w-[100px]" : "w-[150px]";
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
    </div>
  );
}
