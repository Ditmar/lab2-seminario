import { Request, Response } from "express";
import { Task } from "../types/task";

let tasks: Task[] = [
  { id: 1, title: "Aprender patron Repository", done: false },
  { id: 2, title: "Refactorizar el controller", done: false },
];
let nextId = 3;

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
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
  const newTask: Task = { id: nextId++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const exists = tasks.some((t) => t.id === id);
  if (!exists) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
};
