import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  constructor(private repository: TaskRepository) {}

  async getTasks(req: Request, res: Response) {
    const tasks = await this.repository.findAll();

    res.json(tasks);
  }

  async getTaskById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const task = await this.repository.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  }

  async createTask(req: Request, res: Response) {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const newTask = await this.repository.create({
      title,
      done: false,
    });

    res.status(201).json(newTask);
  }

  async updateTask(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { title, done } = req.body;

    const updatedTask = await this.repository.update(id, {
      title,
      done,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  }

  async deleteTask(req: Request, res: Response) {
    const id = Number(req.params.id);

    const deleted = await this.repository.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  }
}