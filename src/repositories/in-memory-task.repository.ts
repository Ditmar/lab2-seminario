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

  async findById(id: number): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async create(title: string): Promise<Task> {
    const newTask: Task = {
      id: this.nextId++,
      title,
      done: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  async update(
    id: number,
    data: { title?: string; done?: boolean }
  ): Promise<Task | undefined> {
    const task = this.tasks.find((currentTask) => currentTask.id === id);

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

  async delete(id: number): Promise<boolean> {
    const initialLength = this.tasks.length;

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.tasks.length < initialLength;
  }
}