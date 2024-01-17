import { cn } from "@/lib/cn";
import { usePage } from "@inertiajs/react";
import InlineSVG from "react-inlinesvg";

export default function MessageBox() {
  const { props } = usePage();
  const { id, users } = props as any;

  const user = users.find((user: any) => user.id === parseInt(id));

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
    <div className="w-[30%] h-[83vh] app-shadow rounded-lg bg-white max-[1400px]:w-[40%]">
      {/* Header */}
      <h2 className="text-[#797979] text-[14px] p-3 border h-[5%]">
        Client Message
      </h2>

      {/* Chat Header */}
      <div className="flex items-center gap-2 justify-between bg-[#006D77] rounded-md p-2 text-white h-[10%]">
        <div className="flex items-center">
          <img
            src={user.image}
            alt="user"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-bold text-[14px]">{user.name}</p>
            <p className="text-[8px]">{user.company}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 mr-5">
          <img src="/icons/Chat.png" alt="chat" className="w-5 h-5" />
          <img src="/icons/Email.png" alt="chat" className="w-5 h-5" />
          <img src="/icons/Phone.png" alt="phone" className="w-5 h-5" />
        </div>
      </div>

      {/* Messages */}
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
    </div>
  );
}
