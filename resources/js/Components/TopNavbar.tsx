import { ImSearch } from "react-icons/im";
import TopNavbarIcons from "./TopNavbarIcons";
import { usePage } from "@inertiajs/react";

export default function TopNavbar() {
  const { props } = usePage();
  const { hasGoogleCalendar, hasCalendly } = props;

  console.log("hasGoogleCalendar: ", hasGoogleCalendar);
  console.log("hasCalendly: ", hasCalendly);

  return (
    <div className="h-[7vh] flex items-center p-5 justify-between pr-10">
      <form className="flex items-center">
        <div className="">
          {/* TEMP */}
          <ImSearch className="w-[14px] h-[14px] text-[#797979]" />
        </div>
        <input
          type="text"
          className="text-[#797979] border-none outline-none ml-2 text-[15px]"
          placeholder="Search here..."
        />
      </form>

      {/* Google Auth Button */}
      {!hasGoogleCalendar && (
        <a
          href={route("auth.google.calendar")}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Connect Google Calendar
        </a>
      )}

      {/* Calendly Auth Button */}
      {!hasCalendly && (
        <a
          href={route("auth.calendly")}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Connect Calendly
        </a>
      )}

      {/* Icons */}
      <TopNavbarIcons />
    </div>
  );
}
