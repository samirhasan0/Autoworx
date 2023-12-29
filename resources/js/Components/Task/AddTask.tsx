import { useForm } from "@inertiajs/react";
import Popup from "../Popup";
import { usePopupStore } from "@/stores/popup";

export default function AddTask() {
  const { data: taskData, close } = usePopupStore();

  console.log(taskData.date);

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "Fuck you",
    date: taskData.date,
    start_time: "",
    end_time: "",
    type: "task",
  });

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("task.store"));
    close();
  };

  return (
    <Popup>
      <form className="flex flex-col w-[40rem] p-5" onSubmit={handleAdd}>
        <h2 className="text-center font-bold text-2xl">Add Schedule</h2>

        <div className="flex flex-col mb-4">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border border-gray-300 rounded-md p-2"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
          />
          {errors.title && (
            <div className="text-red-500 text-sm">{errors.title}</div>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            className="border border-gray-300 rounded-md p-2"
            value={data.date}
            onChange={(e) => setData("date", e.target.value)}
          />
          {errors.date && (
            <div className="text-red-500 text-sm">{errors.date}</div>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="time"
            name="start_time"
            id="start_time"
            className="border border-gray-300 rounded-md p-2"
            value={data.start_time}
            onChange={(e) => setData("start_time", e.target.value)}
          />
          {errors.start_time && (
            <div className="text-red-500 text-sm">{errors.start_time}</div>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="end_time">End Time</label>
          <input
            type="time"
            name="end_time"
            id="end_time"
            className="border border-gray-300 rounded-md p-2"
            value={data.end_time}
            onChange={(e) => setData("end_time", e.target.value)}
          />
          {errors.end_time && (
            <div className="text-red-500 text-sm">{errors.end_time}</div>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            className="border border-gray-300 rounded-md p-2"
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
