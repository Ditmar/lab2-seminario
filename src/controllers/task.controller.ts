import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

export const createTaskController = (taskRepository: TaskRepository) => {
  const getTasks = (req: Request, res: Response) => {
    res.json(taskRepository.findAll());
  };

  const getTaskById = (req: Request, res: Response) => {
    const task = taskRepository.findById(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  };

  const createTask = (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTask = taskRepository.create(title);
    res.status(201).json(newTask);
  };

  const updateTask = (req: Request, res: Response) => {
    const { title, done } = req.body;
    const task = taskRepository.update(Number(req.params.id), { title, done });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  };

  const deleteTask = (req: Request, res: Response) => {
    const deleted = taskRepository.delete(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  };

  return { getTasks, getTaskById, createTask, updateTask, deleteTask };
};