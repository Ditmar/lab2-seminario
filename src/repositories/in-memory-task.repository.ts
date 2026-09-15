import { TaskRepository } from "./task.repository";
import { Task } from "../types/task";

export class InMemoryTaskRepository implements TaskRepository {

  private tasks: Task[] = [
    { id: 1, title: "Aprender patron Repository", done: false },
    { id: 2, title: "Refactorizar el controller", done: false }
  ];

  private nextId = 3;

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

 create(task: Omit<Task, "id">): Task {
    const newTask = {
      ...task,
      id: this.nextId++
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: number, data: Partial<Task>): Task | undefined {
    const task = this.findById(id);

    if (!task) {
      return undefined;
    }

    Object.assign(task, data);

    return task;
  }

  delete(id: number): boolean {
    const exists = this.tasks.some(task => task.id === id);

    if (!exists) {
      return false;
    }

    this.tasks = this.tasks.filter(task => task.id !== id);

    return true;
  }
}
