
import { Router } from "express";
import { createTaskController } from "../controllers/task.controller";
import { InMemoryTaskRepository } from "../repositories/in-memory-task.repository";

const router = Router();

// Crear el repositorio
const repository = new InMemoryTaskRepository();

// Inyectar el repositorio en el controlador
const controller = createTaskController(repository);

// Registrar las rutas
router.get("/", controller.getTasks);
router.get("/:id", controller.getTaskById);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;
