import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks = (_req: Request, res: Response): void => {
    res.json(this.taskRepository.findAll());
  };

  getTaskById = (req: Request, res: Response): void => {
    const task = this.taskRepository.findById(Number(req.params.id));
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  };

  createTask = (req: Request, res: Response): void => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "title is required" });
      return;
    }
    res.status(201).json(this.taskRepository.create({ title, done: false }));
  };

  updateTask = (req: Request, res: Response): void => {
    const { title, done } = req.body;
    const task = this.taskRepository.update(Number(req.params.id), { title, done });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  };

  deleteTask = (req: Request, res: Response): void => {
    if (!this.taskRepository.delete(Number(req.params.id))) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(204).send();
  };
}
