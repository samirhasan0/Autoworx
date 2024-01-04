import { usePopupStore } from "@/stores/popup";
import AddTask from "./Task/calendar/AddTask";
import AddUser from "./AddUser";
import AssignTask from "./Task/users/AssignTask";

export default function PopupState() {
  const { popup } = usePopupStore();

  if (popup === "ADD_TASK") return <AddTask />;
  if (popup === "ADD_USER") return <AddUser />;
  if (popup === "ASSIGN_TASK") return <AssignTask />;
}
