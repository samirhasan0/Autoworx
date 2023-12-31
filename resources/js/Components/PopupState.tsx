import { usePopupStore } from "@/stores/popup";
import AddTask from "./Task/calendar/AddTask";

export default function PopupState() {
  const { popup } = usePopupStore();

  if (popup === "ADD_TASK") return <AddTask />;
}
