import Calendar from "@/Components/Task/calendar/Calendar";
import Title from "@/Components/Title";
import { TaskType } from "@/types/task";
import { useForm, Head } from "@inertiajs/react";

export default function Task({ tasks }: { tasks: TaskType[] }) {
  console.log(tasks);

  return (
    <>
      <Head title="Task and Activity Management" />

      <Title>Task and Activity Management</Title>

      <Calendar tasks={tasks} />
    </>
  );
}
