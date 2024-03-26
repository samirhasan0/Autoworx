import { cn } from "@/lib/cn";
import { useForm, usePage } from "@inertiajs/react";
import InlineSVG from "react-inlinesvg";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

interface Message {
  message: string;
  sender: "CLIENT" | "USER";
}

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

  const { data, setData, post, errors, reset, processing } = useForm({
    message: "",
    userId: user.id,
  });

  const [messages, setMessages] = useState<Message[]>([]);

  // fetch messages
  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(
        route("messages.index", { userId: user.id })
      );
      const data = await response.json();
      const messages = data.map((message: any) => ({
        message: message.message,
        sender: message.from == authUser.id ? "USER" : "CLIENT",
      }));

      setMessages(messages);
    }

    fetchMessages();
  }, [user.id]);

  useEffect(() => {
    const channel = window.Echo.private(`chat.${authUser.id}`);

    channel.listen(".message", (e: any) => {
      console.log(e);

      if (e.from === user.id) {
        setMessages((messages) => [
          ...messages,
          {
            message: e.message,
            sender: "CLIENT",
          },
        ]);
      }
    });

    // Unsubscribe from the channel when the component is unmounted
    return () => {
      channel.stopListening(".message");
    };
  }, []);

  useEffect(() => console.log(messages), [messages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    reset("message");
    post(route("messages.store"), {
      onSuccess: () => {
        setMessages((messages) => [
          ...messages,
          {
            message: data.message,
            sender: "USER",
          },
        ]);
      },
    });
  };

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
            <p className="font-bold text-[10px]">
              {user.name} - {user.id}
            </p>
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
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={`flex items-center p-1 ${
              message.sender === "CLIENT" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex items-center gap-2 p-1">
              {/* TODO: */}
              {/* {message.sender === "client" &&
                messages[index - 1]?.sender !== "client" && (
                  <img
                    src={user.image}
                    alt="user"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                )} */}

              <p
                className={cn(
                  "text-[10px] rounded-xl p-2 max-w-[220px]",
                  message.sender === "CLIENT"
                    ? "bg-[#D9D9D9] text-slate-800"
                    : "bg-[#006D77] text-white"
                  // TODO
                  // messages[index - 1]?.sender === "client" && "ml-[58px]"
                )}
              >
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 bg-[#D9D9D9] h-[8%] p-2"
        onSubmit={handleSubmit}
      >
        <InlineSVG src="/icons/attachment.svg" className="w-5  h-5" />
        <input
          type="text"
          placeholder="Send Message..."
          className="w-full rounded-md text-[8px] px-1 py-0 border-none"
          value={data.message}
          onChange={(e) => setData("message", e.target.value)}
        />
        <button className="">
          {processing ? (
            <ThreeDots color="green" height={10} width={10} />
          ) : (
            <InlineSVG src="/icons/send.svg" className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}
