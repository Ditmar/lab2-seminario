import { Task } from "../types/task";
import { CreateTaskData, TaskRepository, UpdateTaskData } from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[];
  private nextId: number;

  constructor(initialTasks: Task[] = []) {
    this.tasks = [...initialTasks];
    this.nextId = this.tasks.reduce((max,t) => Math.max(max, t.id), 0) + 1;
  }
  async findAll(): Promise<Task[]> {
    return this.tasks.map((task) => ({ ...task }));
  }
  async findById(id: number): Promise<Task | null> {
    const task = this.tasks.find((t) => t.id === id);
    return task ? { ...task } : null;
  }
  async create(data: CreateTaskData): Promise<Task> {
    const newTask: Task = { id: this.nextId++, title: data.title, done: false };
    this.tasks.push(newTask);
    return { ...newTask };
  }
  async update(id: number, changes: UpdateTaskData): Promise<Task | null> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    if (changes.title !== undefined) task.title = changes.title;
    if (changes.done !== undefined) task.done = changes.done;
    return { ...task };
  }
  async delete(id: number): Promise<boolean> {
    const exists = this.tasks.some((t) => t.id === id);
    if (!exists) return false;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return true;
  }
}