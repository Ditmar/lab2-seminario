import { Router } from "express";
import { createTaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repositories/in-memory-task.repository";

const router = Router();
const taskRepository = new InMemoryTaskRepository();
const taskController = createTaskController(taskRepository);

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
