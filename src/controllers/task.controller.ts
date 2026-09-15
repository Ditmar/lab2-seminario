import { Request, Response } from "express";
import { InMemoryTaskRepository } from "../repositories/in-memory-task.repository";

const taskRepository = new InMemoryTaskRepository();

export const getTasks = (req: Request, res: Response) => {
  res.json(taskRepository.findAll());
};

export const getTaskById = (req: Request, res: Response) => {
  const task = taskRepository.findById(Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const newTask = taskRepository.create({
    title,
    done: false
  });

  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const updatedTask = taskRepository.update(id, req.body);

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(updatedTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const deleted = taskRepository.delete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(204).send();
};