import { cn } from "@/lib/cn";
import { usePopupStore } from "@/stores/popup";
import moment from "moment";

export default function Day() {
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

  function formatDate(date: Date) {
    return moment(date).format("YYYY-MM-DD");
  }

  function formatTime(row: string) {
    const [hour, period] = row.split(" ");
    const time = `${hour.padStart(2, "0")}:00 ${period}`;
    return moment(time, "hh:mm A").format("HH:mm");
  }

  return (
    <div className="border-[#797979] border h-[90%] mt-3 overflow-scroll">
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
    </div>
  );
}
