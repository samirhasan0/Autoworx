import { useLastSegment } from "@/hooks/useLastSegment";
import { cn } from "@/lib/cn";
import { Link, usePage } from "@inertiajs/react";

export default function List() {
  const id = parseInt(useLastSegment());
  const { props } = usePage();
  const users = props.users as any[]; // TODO: type this

  console.log("users: ", users);

  return (
    <div className="w-[280px] h-[760px] rounded-lg bg-white app-shadow p-3">
      {/* Header */}
      <h2 className="text-[#797979] text-[14px]">Client List</h2>

      {/* Search */}
      <form>
        <input
          type="text"
          placeholder="Search here..."
          className="text-[#797979] text-[12px] border-none p-2 my-3 mr-2 rounded-md"
        />
        <button
          type="submit"
          className="text-[12px] bg-[#797979] w-[62px] h-[26px] text-white rounded-md"
        >
          Filter
        </button>
      </form>

      {/* List */}
      <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[580px]">
        {users.map((user) => {
          const selected = id == user.id;
          return (
            <Link
              key={user.id}
              className={cn(
                "flex items-center gap-2 rounded-md p-2",
                selected ? "bg-[#006D77]" : "bg-[#F2F2F2]"
              )}
              href={`/communication/client/${user.id}`}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-[60px] h-[60px] rounded-full"
              />
              <div className="flex flex-col">
                <p
                  className={cn(
                    "font-bold text-[14px]",
                    selected ? "text-white" : "text-[#797979]"
                  )}
                >
                  {user.name}
                </p>
                <p
                  className={cn(
                    "text-[8px]",
                    selected ? "text-white" : "text-[#797979]"
                  )}
                >
                  {user.company}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <button className="bg-blue-500 text-white text-[15px] py-2 rounded-md w-full mt-5">
        Add Client
      </button>
    </div>
  );
}
