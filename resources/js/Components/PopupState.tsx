import { usePopupStore } from "@/stores/popup";
import AddTask from "./Task/calendar/AddTask";
import AddUser from "./AddUser";

export default function PopupState() {
  const { popup } = usePopupStore();

  if (popup === "ADD_TASK") return <AddTask />;
  if (popup === "ADD_USER") return <AddUser />;
}
