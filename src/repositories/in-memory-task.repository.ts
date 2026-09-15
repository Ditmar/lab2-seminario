import { Task } from "../types/task";
import { TaskRepository } from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    { id: 1, title: "Aprender patron Repository", done: false },
    { id: 2, title: "Refactorizar el controller", done: false },
  ];
  private nextId = 3;

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: number): Promise<Task | null> {
    const task = this.tasks.find((t) => t.id === id);
    return task || null;
  }

  async create(title: string): Promise<Task> {
    const newTask: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id: number, data: Partial<Omit<Task, "id">>): Promise<Task | null> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;

    if (data.title !== undefined) task.title = data.title;
    if (data.done !== undefined) task.done = data.done;

    return task;
  }

  async delete(id: number): Promise<boolean> {
    const exists = this.tasks.some((t) => t.id === id);
    if (!exists) return false;

    this.tasks = this.tasks.filter((t) => t.id !== id);
    return true;
  }
}