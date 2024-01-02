export interface TaskType {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  type: "task" | "appointment" | "event";
  assigned_users: number[];
}
