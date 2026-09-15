import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repositories/InMemoryTaskRepository";

const router = Router();
const taskController = new TaskController(new InMemoryTaskRepository());

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
