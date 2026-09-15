import { Task } from "../types/task";

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | null;
  create(title: string): Task;
  update(id: number, data: Partial<Omit<Task, "id">>): Task | null;
  delete(id: number): boolean;
}