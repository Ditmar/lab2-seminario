import { Task } from "../types/task";

export interface TaskRepository {
  getAll(): Task[];
  getById(id: number): Task | undefined;
  create(title: string): Task;
  update(id: number, title?: string, done?: boolean): Task | undefined;
  delete(id: number): boolean;
}

let tasks: Task[] = [
  { id: 1, title: "Aprender patron Repository", done: false },
  { id: 2, title: "Refactorizar el controller", done: false }
];
let nextId = 3;

export class InMemoryTaskRepository implements TaskRepository {
  getAll() { return tasks; }

  getById(id: number) { return tasks.find(t => t.id === id); }

  create(title: string) {
    const newTask = { id: nextId++, title, done: false };
    tasks.push(newTask);
    return newTask;
  }

  update(id: number, title?: string, done?: boolean) {
    const task = this.getById(id);
    if (task) {
      if (title !== undefined) task.title = title;
      if (done !== undefined) task.done = done;
    }
    return task;
  }

  delete(id: number) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}
