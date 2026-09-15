import { Router } from "express";
import { createTaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repositories/InMemoryTaskRepository";

const router = Router();

const repository = new InMemoryTaskRepository();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = createTaskController(repository);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;