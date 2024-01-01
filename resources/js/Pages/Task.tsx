import Calendar from "@/Components/Task/calendar/Calendar";
import CalendarUser from "@/Components/Task/users/CalendarUser";
import Title from "@/Components/Title";
import { useTaskStore } from "@/stores/tasks";
import { TaskType } from "@/types/task";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Task({ tasks }: { tasks: TaskType[] }) {
  const { setTasks } = useTaskStore();

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  return (
    <>
      <Head title="Task and Activity Management" />

      <Title>Task and Activity Management</Title>

      <div className="flex">
        <Calendar />
        <CalendarUser />
      </div>
    </>
  );
}
