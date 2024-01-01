import { cn } from "@/lib/cn";
import React, { useState } from "react";

export default function Users() {
  const fakeUsers = [
    {
      name: "Shanto",
      image: "/images/default.png",
      tasks: ["Lorem ipsum", "dolor sit amet", "consectetur adipisicing elit"],
    },
    {
      name: "Samir",
      image: "/images/default.png",
      tasks: [
        "Lorem ipsum",
        "dolor sit amet",
        "consectetur adipisicing elit",
        "Lorem ipsum",
        "dolor sit amet",
      ],
    },
    {
      name: "Amir",
      image: "/images/default.png",
      tasks: [
        "Lorem ipsum",
        "dolor sit amet",
        "consectetur adipisicing elit",
        "Lorem ipsum",
        "dolor sit amet",
      ],
    },
  ];

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  return (
    <div className="bg-white calender-shadow h-[660px] mt-5 rounded-[12px] p-3">
      <h2 className="text-[#797979] text-[16px]">User List</h2>

      <form className="flex items-center justify-center gap-2 mt-3">
        <input
          type="search"
          className="w-[70%] border-none"
          placeholder="Search here..."
        />
        <button className="bg-[#797979] rounded-[5px] text-white text-[13px] w-[30%] p-2">
          Filter
        </button>
      </form>

      <div className="mt-5">
        {fakeUsers.map((user, index) => {
          const isSelected = selectedUser === index;

          function handleClick() {
            if (isSelected) {
              setSelectedUser(null);
            } else {
              setSelectedUser(index);
            }
          }

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
        })}
      </div>
    </div>
  );
}
