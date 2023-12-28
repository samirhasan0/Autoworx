import { cn } from "@/lib/cn";

export default function Day() {
  const rows = [
    "All Day",
    // 1pm to 12am
    ...Array.from(
      { length: 24 },
      (_, i) =>
        `${i + 1 > 12 ? i + 1 - 12 : i + 1} ${i + 1 >= 12 ? "AM" : "PM"}`
    ),
  ];

  return (
    <div className="border-[#797979] border h-[90%] mt-3 overflow-scroll">
      {rows.map((row, i) => (
        <div
          key={i}
          className={cn(
            "h-[45px] border-[#797979]",
            i !== rows.length - 1 && "border-b"
          )}
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
        </div>
      ))}
    </div>
  );
}
