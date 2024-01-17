import { cn } from "@/lib/cn";
import { usePage } from "@inertiajs/react";
import InlineSVG from "react-inlinesvg";
import { FaTimes } from "react-icons/fa";

export default function MessageBox({
  user,
  setUsersList,
}: {
  user: any; // TODO: type this
  setUsersList: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { props } = usePage();
  const { auth } = props as any;
  const { user: authUser } = auth;

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
    <div className="w-[18%] h-[40vh] overflow-hidden app-shadow rounded-lg bg-white max-[1400px]:w-[40%] border">
      {/* Chat Header */}
      <div className="flex items-center gap-2 justify-between bg-[#006D77] rounded-md p-2 text-white h-[10%]">
        <div className="flex items-center gap-1">
          <img
            src={user.image}
            alt="user"
            className="w-[25px] h-[25px] rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-bold text-[10px]">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src="/icons/Chat.png" alt="chat" className="w-2 h-2" />
          <img src="/icons/Email.png" alt="chat" className="w-2 h-2" />
          <img src="/icons/Phone.png" alt="phone" className="w-2 h-2" />
          <FaTimes
            className="text-sm cursor-pointer"
            onClick={() => {
              setUsersList((usersList) =>
                usersList.filter((u) => u.id !== user.id)
              );
            }}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="h-[82%] overflow-y-scroll">
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
                    className="w-[30px] h-[30px] rounded-full"
                  />
                )}

              <p
                className={cn(
                  "text-[10px] rounded-xl p-2 max-w-[220px]",
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
      <form className="flex items-center gap-2 bg-[#D9D9D9] h-[8%] p-2">
        <InlineSVG src="/icons/attachment.svg" className="w-5  h-5" />
        <input
          type="text"
          placeholder="Send Message..."
          className="w-full rounded-md text-[8px] px-1 py-0 border-none"
        />
        <button className="">
          <InlineSVG src="/icons/send.svg" className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
