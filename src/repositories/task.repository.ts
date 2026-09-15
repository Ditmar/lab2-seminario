import { Task } from '../types/task';

export interface TaskRepository {
  findAll(): Task[];
  findById(id: number): Task | null;
  create(title: string): Task;
  update(id: number, data: { title?: string; done?: boolean }): Task | null;
  delete(id: number): boolean;
}