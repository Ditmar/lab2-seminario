import express from "express";
import taskRoutes from "./routes/task.routes";
import { InMemoryTaskRepository } from "./repositories/in-memory-task.repository";

const app = express();
const PORT = 3000;

app.use(express.json());

const repository = new InMemoryTaskRepository();
app.use("/tasks", taskRoutes(repository));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});