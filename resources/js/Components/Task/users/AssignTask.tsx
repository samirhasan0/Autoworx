import AddTaskComponent from "@/Components/AddTaskComponent";
import Popup from "@/Components/Popup";
import { usePopupStore } from "@/stores/popup";
import { useTaskStore } from "@/stores/tasks";
import { useUsersStore } from "@/stores/users";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function AssignTask() {
  const { data: taskData, close } = usePopupStore();
  const { users, current } = useUsersStore();
  const { tasks } = useTaskStore();
  const { data, setData, put, processing, errors, reset } = useForm<{
    user: string;
    // [[task, boolean]]
    tasks: [string, boolean][];
  }>({
    user: taskData.assigned_users,
    tasks: tasks.map((task) => [
      task.id.toString(),
      task.assigned_users.includes(parseInt(taskData.assigned_users)),
    ]),
  });

  console.log("data: ", data);

  const [selectedButton, setSelectedButton] = useState<"ASSIGN" | "ADD">(
    "ASSIGN"
  );

  const usersToShow = users.filter((user) => user.id !== current?.id);

  const user = usersToShow.filter(
    (user) => user.id === parseInt(taskData.assigned_users)
  )[0];

  function handleSubmit(e: any) {
    e.preventDefault();
    put(route("task.assign", { user: data.user, tasks: data.tasks }), {
      onSuccess: () => {
        close();
      },
    });
  }

  return (
    <Popup>
      <div className="w-[40rem] p-2 text-slate-600">
        <div className="flex items-center justify-center text-xl">
          <button
            className="w-[20rem] p-2 border rounded-tl-lg"
            style={{
              backgroundColor:
                selectedButton === "ASSIGN" ? "#006D77" : "#F8F9FA",
              color: selectedButton === "ASSIGN" ? "white" : "#797979",
            }}
            onClick={() => setSelectedButton("ASSIGN")}
          >
            Assign Task
          </button>

          <button
            className="w-[20rem] p-2 border rounded-tr-xl"
            style={{
              backgroundColor: selectedButton === "ADD" ? "#006D77" : "#F8F9FA",
              color: selectedButton === "ADD" ? "white" : "#797979",
            }}
            onClick={() => setSelectedButton("ADD")}
          >
            Add Task
          </button>
        </div>

        {selectedButton === "ASSIGN" ? (
          <div className="mt-5">
            <h2 className="text-lg font-bold">Assign task for user</h2>

            <div className="flex items-center gap-2 mt-1">
              <img
                src={user.image}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <p className="text-xl font-bold">{user.name}</p>
            </div>

            <h2 className="text-lg font-bold mt-5">Select tasks</h2>

            <form onSubmit={handleSubmit}>
              {/* input:checkbox for tasks */}
              <div className="flex flex-col p-2 font-bold gap-2 max-h-[15rem] overflow-y-auto">
                {data.tasks.map((task, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="tasks"
                      value={task[0]}
                      checked={task[1]}
                      onChange={(e) => {
                        const newTasks = data.tasks.map((t) => {
                          if (t[0] === e.target.value) {
                            return [t[0], e.target.checked];
                          }
                          return t;
                        });
                        // @ts-ignore
                        setData("tasks", newTasks);
                      }}
                    />
                    <p className="text-lg">{tasks[i].title}</p>
                  </label>
                ))}
              </div>

              {/* error */}
              {errors.tasks && <p className="text-red-600">{errors.tasks}</p>}

              <div className="flex justify-center mt-5 gap-10">
                <button
                  type="submit"
                  className="px-5 py-2 text-lg font-bold text-white bg-blue-600 rounded-md"
                  disabled={processing}
                >
                  {processing ? (
                    <ThreeDots color="white" height={10} width={30} />
                  ) : (
                    "Assign"
                  )}
                </button>

                <button
                  type="button"
                  className="px-5 py-2 text-lg font-bold text-white bg-red-800 rounded-md ml-2"
                  onClick={() => {
                    close();
                    reset();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <AddTaskComponent title="" />
        )}
      </div>
    </Popup>
  );
}
