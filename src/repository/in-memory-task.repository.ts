import { Task } from "../types/task";
import { TaskRepository } from "./task.repository";

export class InMemoryTaskRepository implements TaskRepository {

  private tasks: Task[] = [
    {
      id: 1,
      title: "Aprender patron Repository",
      done: false
    },
    {
      id: 2,
      title: "Refactorizar el controller",
      done: false
    }
  ];

  private nextId = 3;

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  create(title: string): Task {
    const task: Task = {
      id: this.nextId,
      title: title,
      done: false
    };

    this.nextId++;

    this.tasks.push(task);

    return task;
  }

  update(
    id: number,
    title?: string,
    done?: boolean
  ): Task | undefined {

    const task = this.getById(id);

    if (!task) {
      return undefined;
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (done !== undefined) {
      task.done = done;
    }

    return task;
  }

  delete(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);

    return true;
  }
}