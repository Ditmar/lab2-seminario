import { Router } from "express";
import { InMemoryTaskRepository } from "../taskrepository/inmemory.taskrepository";
import { createTaskController } from "../controllers/task.controller";

const router = Router();

const taskRepository = new InMemoryTaskRepository();
const controller = createTaskController(taskRepository);

router.get("/", controller.getTasks);
router.get("/:id", controller.getTaskById);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;