import { Router } from "express";

import { createTaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repository/in-memory-task.repository";

const router = Router();

const repository = new InMemoryTaskRepository();

const controller = createTaskController(repository);

router.get("/", controller.getTasks);
router.get("/:id", controller.getTaskById);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;