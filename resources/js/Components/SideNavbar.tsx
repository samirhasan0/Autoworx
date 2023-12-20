import { cn } from "@/lib/cn";
import { NAV_LINKS, NavItem, SUB_NAV_LINKS } from "@/lib/const";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import InlineSVG from "react-inlinesvg";
import { router } from "@inertiajs/react";

export default function SideNavbar() {
  // Get last path from url
  const lastPath = "/" + window.location.pathname.split("/").pop();

  // State for subNavItems
  const [isOpen, setIsOpen] = useState(ifAnySubItemActive());

  // Check if item is active
  function ifItemActive(item: NavItem) {
    return "/" + item.path?.split("/").pop() === lastPath;
  }

  // Check if any subItem is active
  function ifAnySubItemActive() {
    return SUB_NAV_LINKS.some((navItem) => ifItemActive(navItem));
  }

  router.on("navigate", () => {
    setIsOpen(
      SUB_NAV_LINKS.some(
        (navItem) =>
          navItem.path?.split("/").pop() ===
          window.location.pathname.split("/").pop()
      )
    );
  });

  return (
    <nav className="bg-[#0C1427] fixed h-screen w-[20%] px-10 py-12">
      <div className="flex items-center justify-between">
        {/* logo */}
        <InlineSVG src="/icons/logo.svg" width={214} />

        {/* hamburger menu */}
        <div className="flex flex-col gap-[6px]">
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-6 h-[2px] bg-white"></div>
          <div className="w-6 h-[2px] bg-white"></div>
        </div>
      </div>

      <p className="uppercase mt-16 text-white text-[12px] font-bold">Main</p>

      {/* nav items */}
      <div className="flex flex-col gap-4 mt-4">
        {NAV_LINKS.map((navItem) => (
          <>
            {/* If navItem has subItems */}
            {navItem.subItems ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  {/* Square */}
                  <div
                    className={cn(
                      "w-[10px] h-[10px] border-2 rotate-45",
                      ifAnySubItemActive()
                        ? "border-[#6571FF]"
                        : "border-[#66738C]"
                    )}
                  ></div>
                  {/* Text */}
                  <p
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                      "cursor-pointer text-[14px] select-none",
                      ifAnySubItemActive() ? "text-[#6571FF]" : "text-[#66738C]"
                    )}
                  >
                    {navItem.name}
                  </p>
                </div>

                {/* subItems */}
                <div
                  className={cn(
                    "flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[100px] mt-4" : "max-h-0"
                  )}
                >
                  {navItem.subItems?.map((subItem) => (
                    <div className="flex items-center gap-4">
                      {/* Circle */}
                      <div
                        className={cn(
                          "w-[4px] h-[4px] rounded-full",
                          ifItemActive(subItem)
                            ? "bg-[#6571FF]"
                            : "bg-[#66738C]"
                        )}
                      ></div>

                      {/* Text/Link */}
                      <Link
                        href={subItem.path!}
                        className={cn(
                          "cursor-pointer text-[14px]",
                          ifItemActive(subItem)
                            ? "text-[#6571FF]"
                            : "text-[#66738C]"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // If navItem has no subItems
              <div className="flex items-center gap-4">
                {/* Square */}
                <div
                  className={cn(
                    "w-[10px] h-[10px] border-2 rotate-45",
                    ifItemActive(navItem)
                      ? "border-[#6571FF]"
                      : "border-[#66738C]"
                  )}
                ></div>

                {/* Text/Link */}
                <Link
                  href={navItem.path!}
                  className={cn(
                    "cursor-pointer text-[14px]",
                    ifItemActive(navItem) ? "text-[#6571FF]" : "text-[#66738C]"
                  )}
                >
                  {navItem.name}
                </Link>
              </div>
            )}
          </>
        ))}
      </div>
    </nav>
  );
}
