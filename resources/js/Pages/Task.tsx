import Calendar from "@/Components/Task/calendar/Calendar";
import CalendarUser from "@/Components/Task/users/CalendarUser";
import Title from "@/Components/Title";
import { useTaskStore } from "@/stores/tasks";
import { useUsersStore } from "@/stores/users";
import { User } from "@/types";
import { TaskType } from "@/types/task";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Task({
  tasks,
  users,
}: {
  tasks: TaskType[];
  users: User[];
}) {
  const { setTasks } = useTaskStore();
  const { setUsers } = useUsersStore();

  useEffect(() => {
    setTasks(tasks);
    setUsers(users);
  }, [tasks, users]);

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
