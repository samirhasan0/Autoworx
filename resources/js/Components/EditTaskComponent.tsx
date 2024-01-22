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
  assigned_users: number[];
  timezone: string;
}

export default function EditTaskComponent({
  title = "Edit Schedule",
}: {
  title?: string;
}) {
  const { data: taskData, close } = usePopupStore();
  const { users, current } = useUsersStore();

  const { data, setData, put, processing, errors, reset } =
    useForm<TaskForm>(taskData);

  const usersToShow = users.filter((user) => user.id !== current?.id);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    put(route("task.update", taskData.id), {
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

  console.log("data assigned users: ", data.assigned_users);

  // data.assigned_users is array of (number or NaN). We need to convert it to string (,)
  const assignedUsers = data.assigned_users;
  console.log("assigned users: ", assignedUsers);

  return (
    <form
      className="flex flex-col w-[40rem] p-5 text-slate-600"
      onSubmit={handleEdit}
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
          onChange={(e) =>
            setData("type", e.target.value as "task" | "appointment" | "event")
          }
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
                htmlFor={user.id}
                key={user.id}
                className="flex items-center gap-2 select-none"
              >
                <input
                  type="checkbox"
                  name="assigned_users"
                  id={user.id}
                  value={user.id}
                  checked={assignedUsers.includes(parseInt(user.id))}
                  onChange={(e) => {
                    console.log("data checked: ", e.target.checked);
                    console.log("assigned users: ", assignedUsers);

                    setData(
                      "assigned_users",
                      e.target.checked
                        ? [...assignedUsers, parseInt(e.target.value)]
                        : assignedUsers.filter(
                            (id) => id !== parseInt(e.target.value)
                          )
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
