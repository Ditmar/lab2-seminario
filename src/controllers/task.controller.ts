import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  constructor(private repository: TaskRepository) {}

  getTasks = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.repository.getAll());
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    const task = await this.repository.getById(Number(req.params.id));
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  };

  createTask = async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "title is required" });
      return;
    }

    const task = await this.repository.create(title);
    res.status(201).json(task);
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    const { title, done } = req.body;
    const task = await this.repository.update(
      Number(req.params.id),
      title,
      done
    );

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    const deleted = await this.repository.delete(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(204).send();
  };
}