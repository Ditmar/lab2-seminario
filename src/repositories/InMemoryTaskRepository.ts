import { Task } from "../types/task";
import { TaskRepository } from "./TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    { id: 1, title: "Aprender patron Repository", done: false },
    { id: 2, title: "Refactorizar el controller", done: false },
  ];

  private nextId = 3;

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(task: Task): Task {
    const newTask = { ...task, id: this.nextId++ };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: number, task: Task): Task | undefined {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return undefined;
    }

    this.tasks[index] = task;

    return this.tasks[index];
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