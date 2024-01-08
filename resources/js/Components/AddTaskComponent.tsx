import { useForm } from "@inertiajs/react";
import { usePopupStore } from "@/stores/popup";
import { useUsersStore } from "@/stores/users";
import { ThreeDots } from "react-loader-spinner";

interface TaskForm {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  type: string;
  assigned_users: string;
  timezone: string;
}

export default function AddTaskComponent({
  title = "Add Schedule",
}: {
  title?: string;
}) {
  const { data: taskData, close } = usePopupStore();
  const { users, current } = useUsersStore();

  const { data, setData, post, processing, errors, reset } = useForm<TaskForm>({
    title: "",
    date: taskData.date,
    start_time: taskData.start_time,
    end_time: taskData.end_time,
    type: "task",
    assigned_users: taskData.assigned_users || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const usersToShow = users.filter((user) => user.id !== current?.id);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("task.store"), {
      onSuccess: () => {
        close();
      },
    });
  };

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // get the assigned user
  const assignedUser = usersToShow.filter(
    (user) => user.id === parseInt(taskData.assigned_users)
  )[0];

  return (
    <form
      className="flex flex-col w-[40rem] p-5 text-slate-600"
      onSubmit={handleAdd}
    >
      {title && <h2 className="text-center font-bold text-2xl">{title}</h2>}

      <div className="flex flex-col mb-4">
        <label htmlFor="title" className="font-bold">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="border border-gray-300 rounded-md p-2 mt-2"
          value={data.title}
          onChange={(e) => setData("title", e.target.value)}
          autoFocus
        />
        {errors.title && (
          <div className="text-red-500 text-sm">{errors.title}</div>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="date" className="font-bold">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          min={getCurrentDate()}
          className="border border-gray-300 rounded-md p-2 mt-2"
          value={data.date}
          onChange={(e) => setData("date", e.target.value)}
        />
        {errors.date && (
          <div className="text-red-500 text-sm">{errors.date}</div>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="start_time" className="font-bold">
          Start Time
        </label>
        <input
          type="time"
          name="start_time"
          id="start_time"
          className="border border-gray-300 rounded-md p-2 mt-2"
          value={data.start_time}
          onChange={(e) => setData("start_time", e.target.value)}
        />
        {errors.start_time && (
          <div className="text-red-500 text-sm">{errors.start_time}</div>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="end_time" className="font-bold">
          End Time
        </label>
        <input
          type="time"
          name="end_time"
          id="end_time"
          className="border border-gray-300 rounded-md p-2 mt-2"
          value={data.end_time}
          onChange={(e) => setData("end_time", e.target.value)}
        />
        {errors.end_time && (
          <div className="text-red-500 text-sm">{errors.end_time}</div>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="type" className="font-bold">
          Type
        </label>
        <select
          name="type"
          id="type"
          className="border border-gray-300 rounded-md p-2 mt-2"
          value={data.type}
          onChange={(e) => setData("type", e.target.value)}
        >
          <option value="task">Task</option>
          <option value="appointment">Appointment</option>
          <option value="event">Event</option>
        </select>
        {errors.type && (
          <div className="text-red-500 text-sm">{errors.type}</div>
        )}
      </div>

      {/* custom radio. show user name and image (column)*/}
      <div className="flex flex-col mb-4">
        <label htmlFor="assigned_users" className="font-bold">
          {taskData.only_one_user ? "Assigned User" : "Assigned Users"}
        </label>

        {!taskData.only_one_user && (
          <div className="flex flex-col p-2 font-bold gap-2 mt-2 h-40 overflow-y-auto">
            {usersToShow.map((user) => (
              <label
                htmlFor={user.id.toString()}
                key={user.id}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="assigned_users"
                  id={user.id.toString()}
                  value={user.id}
                  onChange={(e) => {
                    // comma separated string
                    setData(
                      "assigned_users",
                      data.assigned_users.includes(e.target.value)
                        ? data.assigned_users
                            .split(",")
                            .filter((id) => id !== e.target.value)
                            .join(",")
                        : data.assigned_users
                        ? data.assigned_users + "," + e.target.value
                        : e.target.value
                    );
                  }}
                />
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span>{user.name}</span>
              </label>
            ))}
          </div>
        )}
        {errors.assigned_users && (
          <div className="text-red-500 text-sm">{errors.assigned_users}</div>
        )}
      </div>

      {taskData.only_one_user && (
        // only show the user's name and image. no checkbox
        <div className="flex items-center gap-2 bg-slate-100 rounded-md mb-5">
          <img
            src={assignedUser.image}
            alt={assignedUser.name}
            className="w-14 h-14 rounded-full"
          />
          <span className="text-[19px]">{assignedUser.name}</span>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-10 rounded-md"
        >
          {processing ? (
            <ThreeDots color="#fff" height={20} width={40} />
          ) : (
            "Submit"
          )}
        </button>
        <button
          type="button"
          className="bg-red-800 text-white py-2 px-10 rounded-md"
          onClick={() => close()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
