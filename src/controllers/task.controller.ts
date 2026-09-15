import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";

let repository: TaskRepository;

export const setTaskRepository = (taskRepository: TaskRepository) => {
  repository = taskRepository;
};

export const getTasks = async (_req: Request, res: Response) => {
  res.json(await repository.findAll());
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await repository.findById(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }
  res.status(201).json(await repository.create({ title }));
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await repository.update(Number(req.params.id), req.body);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const deleted = await repository.delete(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(204).send();
};
