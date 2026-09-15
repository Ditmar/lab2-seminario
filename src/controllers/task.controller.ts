import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export const createTaskController = (repository: TaskRepository) => ({
  getTasks: async (_req: Request, res: Response): Promise<void> => {
    const tasks = await repository.findAll();
    res.json(tasks);
  },

  getTaskById: async (req: Request, res: Response): Promise<void> => {
    const task = await repository.findById(Number(req.params.id));

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  },

  createTask: async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ message: "title is required" });
      return;
    }

    const newTask = await repository.create(title);
    res.status(201).json(newTask);
  },

  updateTask: async (req: Request, res: Response): Promise<void> => {
    const { title, done } = req.body;

    const task = await repository.update(Number(req.params.id), {
      title,
      done,
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  },

  deleteTask: async (req: Request, res: Response): Promise<void> => {
    const deleted = await repository.delete(Number(req.params.id));

    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(204).send();
  },
});

export type TaskController = ReturnType<typeof createTaskController>;