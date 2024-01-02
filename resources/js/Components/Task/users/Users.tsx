import { cn } from "@/lib/cn";
import React, { useState } from "react";
import User from "./User";
import { usePopupStore } from "@/stores/popup";
import { useUsersStore } from "@/stores/users";

export default function Users() {
  const { users } = useUsersStore();

  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const { open } = usePopupStore();

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

      <div className="mt-5 h-[490px] overflow-scroll">
        {users.map((user, index) => {
          const isSelected = selectedUser === index;

          function handleClick() {
            if (isSelected) {
              setSelectedUser(null);
            } else {
              setSelectedUser(index);
            }
          }

          return (
            <User
              key={index}
              isSelected={isSelected}
              handleClick={handleClick}
              user={user}
              index={index}
            />
          );
        })}
      </div>

      <button
        className="bg-blue-600 rounded-[5px] text-white text-[15px] w-full py-2 mt-3"
        onClick={() => open("ADD_USER")}
      >
        Add User
      </button>
    </div>
  );
}
