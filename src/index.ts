import express from "express";
import { TaskController } from "./controllers/task.controller";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";
import { createTaskRouter } from "./routes/task.routes";

const app = express();
const PORT = 3000;
const taskRepository = new InMemoryTaskRepository([
  { id: 1, title: "Aprender patron Repository", done: false },
  { id: 2, title: "Refactorizar el controller", done: false },
]);
const taskController = new TaskController(taskRepository);

app.use(express.json());
app.use("/tasks", createTaskRouter(taskController));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
