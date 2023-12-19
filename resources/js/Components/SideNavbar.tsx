import { cn } from "@/lib/cn";
import { NAV_LINKS, SUB_NAV_LINKS } from "@/lib/const";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import InlineSVG from "react-inlinesvg";

export default function SideNavbar() {
  let lastPath = "/" + window.location.pathname.split("/").pop();
  const [isOpen, setIsOpen] = useState(
    SUB_NAV_LINKS.some(
      (navItem) => "/" + navItem.path.split("/").pop() === lastPath
    )
  );

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

      {/* nav items */}
      <p className="uppercase mt-16 text-white text-[12px] font-bold">Main</p>

      <div className="flex flex-col gap-4 mt-4">
        {NAV_LINKS.map((navItem) => (
          <>
            {navItem.subItems ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-[10px] h-[10px] border-2 rotate-45",
                      SUB_NAV_LINKS.some(
                        (subNavItem) =>
                          "/" + subNavItem.path.split("/").pop() === lastPath
                      )
                        ? "border-[#6571FF]"
                        : "border-[#66738C]"
                    )}
                  ></div>
                  <p
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                      "cursor-pointer text-[14px] select-none",
                      SUB_NAV_LINKS.some(
                        (subNavItem) =>
                          "/" + subNavItem.path.split("/").pop() === lastPath
                      )
                        ? "text-[#6571FF]"
                        : "text-[#66738C]"
                    )}
                  >
                    {navItem.name}
                  </p>
                </div>

                {isOpen && (
                  <div className="flex flex-col mt-4 gap-4">
                    {navItem.subItems?.map((subItem) => (
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-[4px] h-[4px] rounded-full",
                            lastPath === "/" + subItem.path.split("/").pop()
                              ? "bg-[#6571FF]"
                              : "bg-[#66738C]"
                          )}
                        ></div>
                        <Link
                          href={subItem.path}
                          className={cn(
                            "cursor-pointer text-[14px]",
                            lastPath === "/" + subItem.path.split("/").pop()
                              ? "text-[#6571FF]"
                              : "text-[#66738C]"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-[10px] h-[10px] border-2 rotate-45",
                    lastPath === navItem.path
                      ? "border-[#6571FF]"
                      : "border-[#66738C]"
                  )}
                ></div>
                <Link
                  href={navItem.path}
                  className={cn(
                    "cursor-pointer text-[14px]",
                    lastPath === navItem.path
                      ? "text-[#6571FF]"
                      : "text-[#66738C]"
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
