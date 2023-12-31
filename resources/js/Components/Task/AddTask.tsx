import { useForm } from "@inertiajs/react";
import Popup from "../Popup";
import { usePopupStore } from "@/stores/popup";

export default function AddTask() {
  const { data: taskData, close } = usePopupStore();

  console.log(taskData.date);
  console.log(taskData.start_time);

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    date: taskData.date,
    start_time: taskData.start_time,
    end_time: taskData.end_time,
    type: "task",
  });

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

  return (
    <Popup>
      <form className="flex flex-col w-[40rem] p-5" onSubmit={handleAdd}>
        <h2 className="text-center font-bold text-2xl">Add Schedule</h2>

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

        <div className="flex gap-3 justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-10 rounded-md"
          >
            Add
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
    </Popup>
  );
}
