import Calender from "@/Components/Task/Calender";
import Title from "@/Components/Title";
import { Head } from "@inertiajs/react";

export default function Task() {
  return (
    <>
      <Head title="Task and Activity Management" />

      <Title>Task and Activity Management</Title>

      <Calender />
    </>
  );
}
