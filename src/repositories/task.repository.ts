import { Task } from "../types/task";

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | undefined>;
  create(task: Omit<Task, "id">): Promise<Task>;
  update(id: number, task: Partial<Omit<Task, "id">>): Promise<Task | undefined>;
  delete(id: number): Promise<boolean>;
}