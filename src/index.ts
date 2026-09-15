import express from "express";
import { TaskController } from "./controllers/task.controller";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";
import { createTaskRoutes } from "./routes/task.routes";

const app = express();
const PORT = 3000;
const taskRepository = new InMemoryTaskRepository();
const taskController = new TaskController(taskRepository);

app.use(express.json());
app.use("/tasks", createTaskRoutes(taskController));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
