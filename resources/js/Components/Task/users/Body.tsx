import { useCalendarUserTypeStore } from "@/stores/calendarUserType";
import Users from "./Users";

export default function Body() {
  const { calendarUserType } = useCalendarUserTypeStore();

  if (calendarUserType === "USERS") return <Users />;
}
