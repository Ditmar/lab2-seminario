import { Task } from "../types/task";

export interface TaskRepository {
  getAll(): Task[];
  getById(id: number): Task | undefined;
  create(task: Task): Task;
  update(id: number, task: Task): Task | undefined;
  delete(id: number): boolean;
}