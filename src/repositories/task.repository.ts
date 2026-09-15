import { Task } from "../types/task";

export type CreateTaskDTO = {
  title: string;
};

export type UpdateTaskDTO = {
  title?: string;
  done?: boolean;
};

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | undefined;
  create(data: CreateTaskDTO): Task;
  update(id: number, data: UpdateTaskDTO): Task | undefined;
  delete(id: number): boolean;
}