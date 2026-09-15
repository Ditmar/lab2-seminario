import { Task } from "../types/task";

export type CreateTaskInput = Pick<Task, "title">;
export type UpdateTaskInput = Partial<Pick<Task, "title" | "done">>;

export interface TaskRepository {
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | undefined>;
    create(data: CreateTaskInput): Promise<Task>;
    update(id: number, data: UpdateTaskInput): Promise<Task | undefined>;
    delete(id: number): Promise<boolean>;
}
