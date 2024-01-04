import { cn } from "@/lib/cn";
import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { User } from "@/types";

export default function UserComponent({
  isSelected,
  handleClick,
  user,
  index,
}: {
  isSelected: boolean;
  handleClick: () => void;
  user: User;
  index: number;
}) {
  const { tasks } = useTaskStore();
  const { open } = usePopupStore();

  const userTasks = tasks.filter((task) =>
    task.assigned_users.includes(user.id)
  );

  return (
    <>
      <button
        className={cn(
          "flex items-center py-2 mt-2 w-full rounded-lg",
          isSelected ? "bg-[#006D77]" : "bg-[#F8F9FA]"
        )}
        onClick={handleClick}
        key={index}
      >
        <img
          src={user.image}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <p
          className={cn(
            "text-[14px] ml-2 font-bold",
            isSelected ? "text-white" : "text-[#797979]"
          )}
        >
          {user.name}
        </p>
      </button>

      {isSelected && (
        <div className="my-3">
          {userTasks.map((task, index) => (
            <div className="flex items-center gap-2 mt-2 ml-4" key={index}>
              <div
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: TASK_COLOR[task.type] }}
              ></div>
              <p className="text-[16px]">{task.title}</p>
            </div>
          ))}

          <button
            className="bg-slate-500 rounded-2xl text-white text-[15px] py-1 mt-3 px-5"
            onClick={() =>
              open("ASSIGN_TASK", {
                assigned_users: user.id.toString(),
                only_one_user: true,
              })
            }
          >
            + Assign Task
          </button>
        </div>
      )}
    </>
  );
}
