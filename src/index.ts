import express from "express";
import { createTaskRoutes } from "./routes/task.routes";
import { InMemoryTaskRepository } from "./repositories/task.repository.memory";

const app = express();
const PORT = 3000;

app.use(express.json());

const taskRepository = new InMemoryTaskRepository();
app.use("/tasks", createTaskRoutes(taskRepository));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});