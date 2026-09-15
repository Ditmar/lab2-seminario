import { Task } from "../types/task";

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | undefined;
  create(task: Omit<Task, "id">): Task;
  update(id: number, task: Partial<Task>): Task | undefined;
  delete(id: number): boolean;
}
