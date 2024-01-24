import { TASK_COLOR } from "@/lib/const";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { FaPlus } from "react-icons/fa";

export default function Tasks() {
  const { tasks } = useTaskStore();
  const { open } = usePopupStore();

  return (
    <div className="relative bg-white app-shadow h-[93%] mt-5 rounded-[12px] p-3">
      <h2 className="text-black text-[19px]">Task List</h2>

      <div className="flex flex-wrap mt-3 max-h-[92%] gap-3 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-full text-white text-[17px] py-2 px-4 max-[1300px]:px-2 max-[1300px]:py-1 max-[1300px]:text-[14px]"
            style={{ backgroundColor: TASK_COLOR[task.type] }}
          >
            {task.title}
          </div>
        ))}

        <button
          className="rounded-full text-[17px] text-white py-2 px-14 bg-[#797979] max-[1300px]:px-2 max-[1300px]:py-1 max-[1300px]:text-[14px]"
          onClick={() => open("ADD_TASK")}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
