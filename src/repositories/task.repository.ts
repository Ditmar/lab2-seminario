import { Task } from "../types/task";

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title?: string;
  done?: boolean;
}

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(data: CreateTaskData): Promise<Task>;
  update(id: number, changes: UpdateTaskData): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}