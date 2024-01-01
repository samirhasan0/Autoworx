import Calendar from "@/Components/Task/calendar/Calendar";
import CalendarUser from "@/Components/Task/users/CalendarUser";
import Title from "@/Components/Title";
import { TaskType } from "@/types/task";
import { useForm, Head } from "@inertiajs/react";

export default function Task({ tasks }: { tasks: TaskType[] }) {
  console.log(tasks);

  return (
    <>
      <Head title="Task and Activity Management" />

      <Title>Task and Activity Management</Title>

      <div className="flex">
        <Calendar tasks={tasks} />
        <CalendarUser />
      </div>
    </>
  );
}
