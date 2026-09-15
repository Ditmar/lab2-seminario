import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  constructor(private taskRepository: TaskRepository) {}

  getTasks = (req: Request, res: Response) => {
    const tasks = this.taskRepository.findAll();
    res.json(tasks);
  };

  getTaskById = (req: Request, res: Response) => {
    const task = this.taskRepository.findById(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  };

  createTask = (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTask = this.taskRepository.create({ title });
    res.status(201).json(newTask);
  };

  updateTask = (req: Request, res: Response) => {
    const { title, done } = req.body;
    const task = this.taskRepository.update(Number(req.params.id), {
      title,
      done,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  };

  deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = this.taskRepository.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  };
}
