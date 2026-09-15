import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export function createTaskController(repository: TaskRepository) {
  return {
    getTasks(req: Request, res: Response) {
      res.json(repository.findAll());
    },

    getTaskById(req: Request, res: Response) {
      const task = repository.findById(Number(req.params.id));
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    },

    createTask(req: Request, res: Response) {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: "title is required" });
      }
      const newTask = repository.create({ title });
      res.status(201).json(newTask);
    },

    updateTask(req: Request, res: Response) {
      const { title, done } = req.body;
      const updated = repository.update(Number(req.params.id), { title, done });
      if (!updated) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(updated);
    },

    deleteTask(req: Request, res: Response) {
      const deleted = repository.delete(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(204).send();
    },
  };
}