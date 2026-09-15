import express from "express";
import { createTaskRoutes } from "./routes/task.routes";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";
import { TaskRepository } from "./repositories/task.repository";

const app = express();
const PORT = 3000;

const taskRepository: TaskRepository = new InMemoryTaskRepository([
  { id: 1, title: "Aprender patron Repository", done: false },
  { id: 2, title: "Refactorizar el controller", done: false },
]);

app.use(express.json());
app.use("/tasks", createTaskRoutes(taskRepository));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});