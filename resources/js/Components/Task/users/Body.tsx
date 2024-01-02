import { useCalendarUserTypeStore } from "@/stores/calendarUserType";
import Users from "./Users";
import Tasks from "./Tasks";

export default function Body() {
  const { calendarUserType } = useCalendarUserTypeStore();

  if (calendarUserType === "USERS") return <Users />;
  if (calendarUserType === "TASKS") return <Tasks />;
}
