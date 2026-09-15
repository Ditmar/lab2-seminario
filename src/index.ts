import express from "express";
import { createTaskController } from "./controllers/task.controller";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";
import { createTaskRouter } from "./routes/task.routes";

const app = express();
const PORT = 3000;

const taskRepository = new InMemoryTaskRepository();
const taskController = createTaskController(taskRepository);
const taskRouter = createTaskRouter(taskController);

app.use(express.json());
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});