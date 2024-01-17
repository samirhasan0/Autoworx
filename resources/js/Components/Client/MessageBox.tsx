import { cn } from "@/lib/cn";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import InlineSVG from "react-inlinesvg";
import Messages from "./Messages";
import Email from "./Email";

export default function MessageBox() {
  const { props } = usePage();
  const { id, users } = props as any;

  const user = users.find((user: any) => user.id === parseInt(id));
  const [selected, setSelected] = useState<"MESSAGES" | "EMAILS" | "PHONE">(
    "MESSAGES"
  );

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

        <div className="flex items-center mr-5">
          <button
            onClick={() => setSelected("MESSAGES")}
            className="rounded-full p-3"
            style={{
              backgroundColor:
                selected === "MESSAGES" ? "rgba(255, 255, 255, 0.34)" : "",
            }}
          >
            <img src="/icons/Chat.png" alt="chat" className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSelected("EMAILS")}
            className="rounded-full p-3"
            style={{
              backgroundColor:
                selected === "EMAILS" ? "rgba(255, 255, 255, 0.34)" : "",
            }}
          >
            <img src="/icons/Email.png" alt="chat" className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSelected("PHONE")}
            className="rounded-full p-3"
            style={{
              backgroundColor:
                selected === "PHONE" ? "rgba(255, 255, 255, 0.34)" : "",
            }}
          >
            <img src="/icons/Phone.png" alt="phone" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {selected === "MESSAGES" && <Messages user={user} />}
      {selected === "EMAILS" && <Email user={user} />}
    </div>
  );
}
