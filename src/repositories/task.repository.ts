import { Task } from "../types/task";

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | undefined;
  create(title: string): Task;
  update(id: number, data: Partial<Pick<Task, "title" | "done">>): Task | undefined;
  delete(id: number): boolean;
}
