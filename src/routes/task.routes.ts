import { Router } from "express";
import { TaskRepository } from "../repositories/TaskRepository";
import { createTaskController } from "../controllers/task.controller";

export const createTaskRoutes = (taskRepository: TaskRepository) => {
  const router = Router();
  const controller = createTaskController(taskRepository);

  router.get("/", controller.getTasks);
  router.get("/:id", controller.getTaskById);
  router.post("/", controller.createTask);
  router.put("/:id", controller.updateTask);
  router.delete("/:id", controller.deleteTask);

  return router;
};