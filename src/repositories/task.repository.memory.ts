import { Task } from "../types/task";
import { TaskRepository } from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    { id: 1, title: "Aprender patron Repository", done: false },
    { id: 2, title: "Refactorizar el controller", done: false },
  ];
  private nextId = 3;

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  create(title: string): Task {
    const newTask: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, data: Partial<Pick<Task, "title" | "done">>): Task | undefined {
    const task = this.findById(id);
    if (!task) return undefined;
    if (data.title !== undefined) task.title = data.title;
    if (data.done !== undefined) task.done = data.done;
    return task;
  }

  delete(id: number): boolean {
    const exists = this.tasks.some((t) => t.id === id);
    if (!exists) return false;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return true;
  }
}