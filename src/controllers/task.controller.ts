import { Request, Response } from "express";
import { TaskRepository } from "../repository/task.repository";

export const createTaskController = (repository: TaskRepository) => {

  const getTasks = (req: Request, res: Response) => {
    const tasks = repository.getAll();

    res.json(tasks);
  };

  const getTaskById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const task = repository.getById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);
  };

  const createTask = (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required"
      });
    }

    const task = repository.create(title);

    res.status(201).json(task);
  };

  const updateTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const { title, done } = req.body;

    const task = repository.update(id, title, done);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);
  };

  const deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deleted = repository.delete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(204).send();
  };

  return {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  };
};