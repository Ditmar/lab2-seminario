import express from "express";
import { InMemoryTaskRepository } from "./repositories/InMemoryTaskRepository";
import { setTaskRepository } from "./controllers/task.controller";
import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = 3000;
const taskRepository = new InMemoryTaskRepository();
setTaskRepository(taskRepository);

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
