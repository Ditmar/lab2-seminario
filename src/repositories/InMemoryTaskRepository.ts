import { Task } from "../types/task";
import { TaskRepository } from "./TaskRepository";

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
    const task: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  update(id: number, changes: Partial<Pick<Task, "title" | "done">>): Task | undefined {
    const task = this.findById(id);
    if (!task) return undefined;
    if (changes.title !== undefined) task.title = changes.title;
    if (changes.done !== undefined) task.done = changes.done;
    return task;
  }

  delete(id: number): boolean {
    const len = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < len;
  }
}