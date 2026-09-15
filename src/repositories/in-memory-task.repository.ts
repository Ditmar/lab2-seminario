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
    const task: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  update(
    id: number,
    changes: Partial<Pick<Task, "title" | "done">>,
  ): Task | undefined {
    const task = this.findById(id);
    if (!task) {
      return undefined;
    }

    if (changes.title !== undefined) task.title = changes.title;
    if (changes.done !== undefined) task.done = changes.done;
    return task;
  }

  delete(id: number): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
