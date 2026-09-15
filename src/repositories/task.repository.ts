import { Task } from "../types/task";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getById(id: number): Promise<Task | null>;
    create(title: string): Promise<Task>;
    update(id: number, title?: string, done?: boolean): Promise<Task | null>;
    delete(id: number): Promise<boolean>;
}