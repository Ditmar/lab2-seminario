import { Task } from "../types/task";

export type CreateTaskData = Omit<Task, "id">;
export type UpdateTaskData = Partial<Omit<Task, "id">>;

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | undefined;
  create(data: CreateTaskData): Task;
  update(id: number, data: UpdateTaskData): Task | undefined;
  delete(id: number): boolean;
}
