import { usePage } from "@inertiajs/react";
import React from "react";

export default function Details() {
  const { props } = usePage();
  const { id, users } = props as any;

  const user = users.find((user: any) => user.id === parseInt(id));

  return (
    <div className="w-[50%] h-[83vh] app-shadow rounded-lg bg-white max-[1400px]:w-[40%]">
      {/* Client Heading */}
      <div className="w-full h-[180px] bg-[#006D77] rounded-lg">
        {/* Header */}
        <h2 className="text-white text-[14px] p-3">Client Data</h2>
        {/* Content */}
        <div className="flex gap-5 items-center px-5">
          <img
            src={user.image}
            alt="user"
            className="w-[110px] h-[110px] rounded-full"
          />

          <div className="flex flex-col">
            <h2 className="text-white text-[14px]">{user.name}</h2>
            <p className="text-white text-[14px]">{user.company}</p>
          </div>
        </div>
      </div>

      {/* Client Description */}
      <div>
        <h2 className="text-[#797979] text-[14px] px-5 py-3 mt-2">
          Client Details
        </h2>
        <p className="text-[#797979] text-[14px] px-7">{user.description}</p>
      </div>
    </div>
  );
}
