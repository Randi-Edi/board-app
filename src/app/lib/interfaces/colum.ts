import { Task } from "./task";

export interface Column {
  id: string;
  title: string;
  bgColor: string;
  textColor: string;
  tasks: Task[];
}
