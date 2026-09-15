import express from "express";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";
import { createTaskController } from "./controllers/task.controller";
import { createTaskRoutes } from "./routes/task.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

const repository = new InMemoryTaskRepository();

const controller = createTaskController(repository);

app.use("/tasks", createTaskRoutes(controller));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});