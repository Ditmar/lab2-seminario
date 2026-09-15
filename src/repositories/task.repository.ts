import { Task } from "../types/task";

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(title: string): Promise<Task>;
  update(id: number, data: Partial<Omit<Task, "id">>): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}