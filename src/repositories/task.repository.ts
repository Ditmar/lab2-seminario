import { Task } from "../types/task";

export type UpdateTaskData = Partial<Pick<Task, "title" | "done">>;

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | undefined;
  create(title: string): Task;
  update(id: number, data: UpdateTaskData): Task | undefined;
  delete(id: number): boolean;
}