import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repositories/task.repository";

export default function taskRoutes(repository: TaskRepository): Router {
  const router = Router();
  const controller = new TaskController(repository);

  router.get("/", controller.getTasks);
  router.get("/:id", controller.getTaskById);
  router.post("/", controller.createTask);
  router.put("/:id", controller.updateTask);
  router.delete("/:id", controller.deleteTask);

  return router;
}
