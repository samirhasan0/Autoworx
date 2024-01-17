import { cn } from "@/lib/cn";
import { usePage } from "@inertiajs/react";
import React from "react";
import InlineSVG from "react-inlinesvg";

export default function Email({ user }: { user: any }) {
  const { props } = usePage();
  const { emails } = props as any;

  return (
    <>
      <div className="h-[80%] overflow-y-scroll">
        {emails.map((message: any, index: number) => (
          <div
            key={message.id}
            className={`flex items-center p-1 ${
              message.sender === "client" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex items-center gap-2 p-1">
              {message.sender === "client" &&
                emails[index - 1]?.sender !== "client" && (
                  <img
                    src={user.image}
                    alt="user"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                )}

              <p
                className={cn(
                  "text-[14px] rounded-xl p-2 max-w-[220px]",
                  message.sender === "client"
                    ? "bg-[#D9D9D9] text-slate-800"
                    : "bg-[#006D77] text-white",
                  emails[index - 1]?.sender === "client" && "ml-[58px]"
                )}
              >
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form className="flex items-center gap-2 bg-[#D9D9D9] h-[5%] rounded-b-md px-2">
        <InlineSVG src="/icons/attachment.svg" className="w-8  h-8" />
        <input
          type="text"
          placeholder="Send Message..."
          className="w-full rounded-md text-[10px] px-2 py-0 border-none"
        />
        <button className="">
          <InlineSVG src="/icons/send.svg" className="w-5 h-5" />
        </button>
      </form>
    </>
  );
}
