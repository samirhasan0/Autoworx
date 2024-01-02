import { cn } from "@/lib/cn";
import React from "react";

export default function User({
  isSelected,
  handleClick,
  user,
  index,
}: {
  isSelected: boolean;
  handleClick: () => void;
  user: { name: string; image: string };
  index: number;
}) {
  return (
    <>
      <button
        className={cn(
          "flex items-center py-2 mt-2 w-full rounded-lg",
          isSelected ? "bg-[#006D77]" : "bg-[#F8F9FA]"
        )}
        onClick={handleClick}
        key={index}
      >
        <img
          src={user.image}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <p
          className={cn(
            "text-[14px] ml-2 font-bold",
            isSelected ? "text-white" : "text-[#797979]"
          )}
        >
          {user.name}
        </p>
      </button>

      {isSelected && <div className="mt-2"></div>}
    </>
  );
}
