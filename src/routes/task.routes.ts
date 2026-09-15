import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repositories/in-memory-task.repository";

const router = Router();

const taskRepository = new InMemoryTaskRepository();
const taskController = new TaskController(taskRepository);

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;