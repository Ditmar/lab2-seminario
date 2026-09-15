import { Router } from "express";
import { createTaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repositories/in-memory-task.repository";

const router = Router();

const taskRepository = new InMemoryTaskRepository();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } =
  createTaskController(taskRepository);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;