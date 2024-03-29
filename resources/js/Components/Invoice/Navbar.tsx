import { Link } from "@inertiajs/react";
import React from "react";

export default function Navbar() {
  const LINKS = [
    {
      title: "Invoice List",
      link: "/invoice",
    },
    {
      title: "Create Invoice",
      link: "/invoice/create",
    },
    {
      title: "Create Estimate",
      link: "/invoice/estimate",
    },
    {
      title: "Digital Inspection",
      link: "/invoice/inspection",
    },
  ];
  const currentPath = window.location.pathname;
  const activeLink = LINKS.find((link) => link.link === currentPath);

  return (
    <div className="flex ml-5 mt-5 gap-5 relative">
      {LINKS.map((link) => (
        <Link
          href={link.link}
          key={link.title}
          className="px-5 py-1 invoice-link rounded-md rounded-br-none text-base max-[1450px]:text-sm max-[1250px]:text-xs max-[1250px]:px-3"
          style={{
            backgroundColor:
              activeLink?.link === link.link ? "white" : "#6571FF",
            color: activeLink?.link === link.link ? "#66738C" : "white",
            zIndex: LINKS.length - LINKS.indexOf(link),
          }}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
