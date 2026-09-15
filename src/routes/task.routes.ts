import { Router } from "express";
import { TaskRepository } from "../repositories/task.repository";
import { createTaskController } from "../controllers/task.controller";

export const createTaskRoutes = (repository: TaskRepository) => {
  const router = Router();

  const controller = createTaskController(repository);

  router.get("/", controller.getTasks);
  router.get("/:id", controller.getTaskById);
  router.post("/", controller.createTask);
  router.put("/:id", controller.updateTask);
  router.delete("/:id", controller.deleteTask);

  return router;
};