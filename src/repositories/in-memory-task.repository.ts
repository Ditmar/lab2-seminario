import { TaskRepository } from "./task.repository";
import { Task } from "../types/task";

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
    const task: Task = {
      id: this.nextId++,
      title,
      done: false,
    };

    this.tasks.push(task);
    return task;
  }

  update(id: number, data: Partial<Pick<Task, "title" | "done">>): Task | undefined {
    const task = this.findById(id);

    if (!task) {
      return undefined;
    }

    if (data.title !== undefined) {
      task.title = data.title;
    }

    if (data.done !== undefined) {
      task.done = data.done;
    }

    return task;
  }

  delete(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length < initialLength;
  }
}
