import { cn } from "@/lib/cn";
import React from "react";
import InlineSVG from "react-inlinesvg";

export default function Messages({ user }: { user: any }) {
  const messages = [
    {
      id: 1,
      message: "Hello",
      sender: "client",
    },
    {
      id: 2,
      message: "Hello there. How are you? I am fine. What about you?",
      sender: "user",
    },
    {
      id: 3,
      message: "I am fine. Thanks for asking. What about you?",
      sender: "client",
    },
    {
      id: 4,
      message: "I am fine. Thanks for asking. What about you?",
      sender: "client",
    },
    {
      id: 5,
      message: "I am fine. Thanks for asking. What about you?",
      sender: "client",
    },
    {
      id: 6,
      message: "Hello there. How are you? I am fine. What about you?",
      sender: "user",
    },

    {
      id: 7,
      message: "I am fine. Thanks for asking. What about you?",
      sender: "client",
    },
    {
      id: 8,
      message: "Hello there. How are you? I am fine. What about you?",
      sender: "user",
    },

    {
      id: 9,
      message: "I am fine. Thanks for asking. What about you?",
      sender: "client",
    },
  ];

  return (
    <>
      <div className="h-[80%] overflow-y-scroll">
        {messages.map((message: any, index: number) => (
          <div
            key={message.id}
            className={`flex items-center p-1 ${
              message.sender === "client" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex items-center gap-2 p-1">
              {message.sender === "client" &&
                messages[index - 1]?.sender !== "client" && (
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
                  messages[index - 1]?.sender === "client" && "ml-[58px]"
                )}
              >
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>

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
