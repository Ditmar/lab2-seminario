    
import { Task } from "../types/task";
import { TaskRepository } from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks: Task[] = [
        { id: 1, title: "Aprender patron Repository", done: false },
        { id: 2, title: "Refactorizar el controller", done: false },
    ];
    private nextId = 3;

    async getAll() {
        return this.tasks;
    }

    async getById(id: number) {
        return this.tasks.find((task) => task.id === id) ?? null;
    }

    async create(title: string) {
        const task: Task = { id: this.nextId++, title, done: false };
        this.tasks.push(task);
        return task;
    }

    async update(id: number, title?: string, done?: boolean) {
        const task = await this.getById(id);
        if (!task) return null;

        if (title !== undefined) task.title = title;
        if (done !== undefined) task.done = done;
        return task;
    }

    async delete(id: number) {
        const cantidadAntes = this.tasks.length;
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return this.tasks.length < cantidadAntes;
    }
    }