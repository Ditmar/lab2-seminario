import { Request, Response } from "express";
import { TaskRepository } from "../repositories/TaskRepository";

export const createTaskController = (repository: TaskRepository) => ({
  getTasks: (req: Request, res: Response) => {
    res.json(repository.getAll());
  },

  getTaskById: (req: Request, res: Response) => {
    const task = repository.getById(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  },

  createTask: (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTask = repository.create({
      id: 0,
      title,
      done: false,
    });
    res.status(201).json(newTask);
  },

  updateTask: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = repository.getById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const { title, done } = req.body;
    const updated = repository.update(id, {
      id,
      title: title !== undefined ? title : task.title,
      done: done !== undefined ? done : task.done,
    });
    res.json(updated);
  },

  deleteTask: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = repository.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  },
});
