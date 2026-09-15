import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const createTaskRouter = (taskController: TaskController): Router => {
  const router = Router();

  router.get("/", taskController.getTasks);
  router.get("/:id", taskController.getTaskById);
  router.post("/", taskController.createTask);
  router.put("/:id", taskController.updateTask);
  router.delete("/:id", taskController.deleteTask);

  return router;
};
