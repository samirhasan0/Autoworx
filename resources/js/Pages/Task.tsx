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
  auth,
}: {
  tasks: TaskType[];
  users: User[];
  auth: {
    user: User;
  };
}) {
  const { setTasks } = useTaskStore();
  const { setUsers, setCurrentUser } = useUsersStore();

  useEffect(() => {
    // initially task.assigned_users would be string (comma separated)
    // convert it to array of numbers
    setTasks(
      tasks.map((task) => ({
        ...task,
        // @ts-ignore
        assigned_users: task.assigned_users.split(",").map(Number),
      }))
    );
    setUsers(users);
    setCurrentUser(auth.user);
  }, [tasks, users, auth]);

  return (
    <>
      <Head title="Task and Activity Management" />

      <Title>Task and Activity Management</Title>

      <div className="relative h-[81vh] flex">
        <Calendar />
        <CalendarUser />
      </div>
    </>
  );
}
