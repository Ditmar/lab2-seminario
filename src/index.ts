import express from "express";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";
import { createTaskRoutes } from "./routes/task.routes";

const app = express();
const PORT = 3000;

const taskRepository = new InMemoryTaskRepository();

app.use(express.json());
app.use("/tasks", createTaskRoutes(taskRepository));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});