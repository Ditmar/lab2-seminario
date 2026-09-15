import express from "express";
import { InMemoryTaskRepository } from "./repositories/inMemoryTask.repository";
import { createTaskRouter } from "./routes/task.routes";

const app = express();
const PORT = 3000;

const taskRepository = new InMemoryTaskRepository();

app.use(express.json());
app.use("/tasks", createTaskRouter(taskRepository));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});