import { usePopupStore } from "@/stores/popup";
import React from "react";
import AddTask from "./Task/AddTask";

export default function PopupState() {
  const { popup } = usePopupStore();

  if (popup === "ADD_TASK") return <AddTask />;
}
