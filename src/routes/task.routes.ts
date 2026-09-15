import { Router } from "express";

export const createTaskRoutes = (controller: any) => {

  const router = Router();

  router.get("/", controller.getTasks);
  router.get("/:id", controller.getTaskById);
  router.post("/", controller.createTask);
  router.put("/:id", controller.updateTask);
  router.delete("/:id", controller.deleteTask);

  return router;
};