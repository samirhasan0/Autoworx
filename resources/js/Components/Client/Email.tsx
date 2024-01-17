import { cn } from "@/lib/cn";
import { useForm, usePage } from "@inertiajs/react";
import InlineSVG from "react-inlinesvg";
import { ThreeDots } from "react-loader-spinner";

export default function Email({ user }: { user: any }) {
  const { props } = usePage();
  const { emails } = props as any;
  const { data, setData, post, processing, errors, reset } = useForm({
    subject: "",
    message: "",
    to: user.email,
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    post(route("client.email", user.id));
    reset();
  }

  return (
    <>
      <div className="h-[70%] overflow-y-scroll">
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
      <form
        className="flex items-center gap-2 bg-[#D9D9D9] h-[15%] rounded-b-md px-2"
        onSubmit={handleSubmit}
      >
        <InlineSVG src="/icons/attachment.svg" className="w-8  h-8" />
        <div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md text-[12px] px-2 py-0 border-none"
            name="subject"
            value={data.subject}
            onChange={(e) => setData("subject", e.target.value)}
            required
          />
          <textarea
            placeholder="Send Message..."
            className="w-full rounded-md text-[12px] px-2 py-0 border-none mt-1 resize-none min-h-[70px]"
            name="message"
            value={data.message}
            onChange={(e) => setData("message", e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {processing ? (
            <ThreeDots width={30} height={30} color="green" />
          ) : (
            <InlineSVG src="/icons/send.svg" className="w-5 h-5" />
          )}
        </button>
      </form>
    </>
  );
}
