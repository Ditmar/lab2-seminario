import { Task } from "../types/task";
import {
  CreateTaskData,
  TaskRepository,
  UpdateTaskData,
} from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[];
  private nextId: number;

  constructor(initialTasks: Task[] = []) {
    this.tasks = initialTasks.map((task) => ({ ...task }));
    this.nextId = Math.max(0, ...initialTasks.map((task) => task.id)) + 1;
  }

  findAll(): Task[] { return this.tasks; }

  findById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(data: CreateTaskData): Task {
    const task: Task = { id: this.nextId++, ...data };
    this.tasks.push(task);
    return task;
  }

  update(id: number, data: UpdateTaskData): Task | undefined {
    const task = this.findById(id);
    if (!task) return undefined;
    if (data.title !== undefined) task.title = data.title;
    if (data.done !== undefined) task.done = data.done;
    return task;
  }

  delete(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}
