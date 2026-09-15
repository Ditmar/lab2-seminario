import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
  constructor(private taskRepository: TaskRepository) {}

  getTasks = async (req: Request, res: Response) => {
    const tasks = await this.taskRepository.findAll();
    res.json(tasks);
  };

  getTaskById = async (req: Request, res: Response) => {
    const task = await this.taskRepository.findById(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  };

  createTask = async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTask = await this.taskRepository.create(title);
    res.status(201).json(newTask);
  };

  updateTask = async (req: Request, res: Response) => {
    const { title, done } = req.body;
    const updatedTask = await this.taskRepository.update(Number(req.params.id), {
      title,
      done,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  };

  deleteTask = async (req: Request, res: Response) => {
    const success = await this.taskRepository.delete(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  };
}