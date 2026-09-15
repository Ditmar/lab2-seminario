import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {
    this.getTasks = this.getTasks.bind(this);
    this.getTaskById = this.getTaskById.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  getTasks(req: Request, res: Response) {
    res.json(this.taskRepository.findAll());
  }

  getTaskById(req: Request, res: Response) {
    const task = this.taskRepository.findById(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  }

  createTask(req: Request, res: Response) {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTask = this.taskRepository.create(title);
    res.status(201).json(newTask);
  }

  updateTask(req: Request, res: Response) {
    const { title, done } = req.body;
    const task = this.taskRepository.update(
      Number(req.params.id),
      title,
      done,
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  }

  deleteTask(req: Request, res: Response) {
    const deleted = this.taskRepository.delete(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  }
}
