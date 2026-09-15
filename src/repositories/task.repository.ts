import { Task } from "../types/task";

export interface TaskRepository {
  getAll(): Task[];
  getById(id: number): Task | undefined;
  create(title: string): Task;
  update(id: number, changes: Partial<Pick<Task, "title" | "done">>): Task | undefined;
  delete(id: number): boolean;
}