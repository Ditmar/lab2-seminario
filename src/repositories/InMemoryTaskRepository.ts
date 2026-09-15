import { Task } from "../types/task";
import { TaskRepository } from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    {
      id: 1,
      title: "Aprender patron Repository",
      done: false,
    },
    {
      id: 2,
      title: "Refactorizar el controller",
      done: false,
    },
  ];

  private nextId = 3;

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: number): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const newTask: Task = {
      id: this.nextId++,
      title: task.title,
      done: task.done,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  async update(
    id: number,
    task: Partial<Omit<Task, "id">>
  ): Promise<Task | undefined> {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return undefined;
    }

    this.tasks[index] = {
      ...this.tasks[index],
      ...task,
    };

    return this.tasks[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }
}