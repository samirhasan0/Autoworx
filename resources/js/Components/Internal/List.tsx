import { Link } from "@inertiajs/react";
import React from "react";

export default function List({
  users,
  setUsersList,
}: {
  users: any[];
  setUsersList: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  return (
    <div className="w-[20%] h-[83vh] rounded-lg bg-white app-shadow p-3">
      {/* Header */}
      <h2 className="text-[#797979] text-[14px]">User List</h2>

      {/* Search */}
      <form>
        <input
          type="text"
          placeholder="Search here..."
          className="text-[#797979] text-[12px] border-none p-2 my-3 mr-2 rounded-md max-[1822px]:w-full"
        />
        <button
          type="submit"
          className="text-[12px] bg-[#797979] w-[62px] h-[26px] text-white rounded-md"
        >
          Filter
        </button>
      </form>

      {/* List */}
      <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[88%] max-[2127px]:h-[80%]">
        {users.map((user) => {
          return (
            <button
              key={user.id}
              className="flex items-center gap-2 rounded-md p-2 bg-[#F2F2F2]"
              onClick={() => {
                // add this user to the list (if not already in it)
                setUsersList((usersList) => {
                  if (usersList.find((u) => u.id === user.id)) {
                    return usersList;
                  }
                  return [...usersList, user];
                });
              }}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-[60px] h-[60px] rounded-full max-[1400px]:w-[40px] max-[1400px]:h-[40px]"
              />
              <div className="flex flex-col">
                <p className="font-bold text-[14px] text-[#797979]">
                  {user.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
