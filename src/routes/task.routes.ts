import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const createTaskRoutes = (controller: TaskController) => {
  const router = Router();

  router.get("/", controller.getTasks);
  router.get("/:id", controller.getTaskById);
  router.post("/", controller.createTask);
  router.put("/:id", controller.updateTask);
  router.delete("/:id", controller.deleteTask);

  return router;
};
