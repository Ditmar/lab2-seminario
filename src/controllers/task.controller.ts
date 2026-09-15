import { Request, Response } from "express";
import { TaskRepository } from "../taskrepository/task.repository";

export const createTaskController = (repo: TaskRepository) => ({
  getTasks: (req: Request, res: Response) => {
    res.json(repo.findAll());
  },

  getTaskById: (req: Request, res: Response) => {
    const task = repo.findById(Number(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  },

  createTask: (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "title is required" });
    res.status(201).json(repo.create(title));
  },

  updateTask: (req: Request, res: Response) => {
    const task = repo.update(Number(req.params.id), req.body);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  },

  deleteTask: (req: Request, res: Response) => {
    const deleted = repo.delete(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  },
});