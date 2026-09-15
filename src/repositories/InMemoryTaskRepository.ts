import { Task } from "../types/task";
import { TaskRepository } from "./TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    { id: 1, title: "aprender patron Repository", done: false },
    { id: 2, title: "refactorizar el controller", done: false },
  ];

  private nextId = 3;

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(title: string): Task {
    const newTask: Task = {
      id: this.nextId++,
      title,
      done: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, title?: string, done?: boolean): Task | undefined {
    const task = this.getById(id);

    if (!task) {
      return undefined;
    }

    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;

    return task;
  }

  delete(id: number): boolean {
    const task = this.getById(id);

    if (!task) {
      return false;
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }
}