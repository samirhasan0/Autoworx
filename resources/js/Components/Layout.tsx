import { Link } from "@inertiajs/react";
import { useState } from "react";
import InlineSvg from "react-inlinesvg";
import { NAV_LINKS, SUB_NAV_LINKS } from "@/lib/const";
import { cn } from "@/lib/cn";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideNavbar />
      <div className="ml-[20%]">
        <TopNavbar />

        <main className="bg-[#F8F9FA] h-[93vh] p-5">{children}</main>
      </div>
    </div>
  );
}
