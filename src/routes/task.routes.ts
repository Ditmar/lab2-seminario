import { Router } from "express";
import { InMemoryTaskRepository } from "../repositories/in-memory-task.repository";
import { createTaskController } from "../controllers/task.controller";

const router = Router();

const taskRepository = new InMemoryTaskRepository();
const taskController = createTaskController(taskRepository);

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;