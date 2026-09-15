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
    return this.tasks.find((task) => task.id === id);
  }

  create(title: string): Task {
    const newTask: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, title?: string, done?: boolean): Task | undefined {
    const task = this.findById(id);
    if (!task) {
      return undefined;
    }
    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;
    return task;
  }

  delete(id: number): boolean {
    const exists = this.tasks.some((task) => task.id === id);
    if (!exists) {
      return false;
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }
}