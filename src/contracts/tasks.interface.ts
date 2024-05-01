import { IPriority } from "./priority.interface";

export interface ITask {
  id: string;
  title: string;
  description: string;
  secuence: number;
  is_finished: boolean;
  priority: IPriority
  step_id: string
}
