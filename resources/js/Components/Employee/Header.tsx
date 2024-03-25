import { usePopupStore } from "@/stores/popup";
import React from "react";

export default function Header() {
  const { open } = usePopupStore();

  return (
    <div className="flex justify-between items-center pr-10">
      <h1 className="font-bold text-2xl">Employee List</h1>

      <button
        className="bg-[#4DB6AC] px-7 py-2 text-white rounded-md"
        onClick={() => open("ADD_EMPLOYEE")}
      >
        New Employee
      </button>
    </div>
  );
}
