import {
    CreateTaskInput,
    TaskRepository,
    UpdateTaskInput,
} from "./task.repository";
import { Task } from "../types/task";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks: Task[] = [
        { id: 1, title: "Aprender patron Repository", done: false },
        { id: 2, title: "Refactorizar el controller", done: false },
    ];
    private nextId = 3;

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findById(id: number): Promise<Task | undefined> {
        return this.tasks.find((task) => task.id === id);
    }

    async create(data: CreateTaskInput): Promise<Task> {
        const newTask: Task = {
        id: this.nextId++,
        title: data.title,
        done: false,
        };
        this.tasks.push(newTask);
        return newTask;
    }

    async update(
        id: number,
        data: UpdateTaskInput,
    ): Promise<Task | undefined> {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            return undefined;
        }

        if (data.title !== undefined) task.title = data.title;
        if (data.done !== undefined) task.done = data.done;

        return task;
    }

    async delete(id: number): Promise<boolean> {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
        return false;
        }

        this.tasks.splice(taskIndex, 1);
        return true;
    }
}
