import { Router } from "express";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  create_task_query_validator,
  update_task_query_validator,
} from "./task.validation";
import taskController from "./task.controller";
const taskRoutes = Router();

taskRoutes.post(
  "/",
  validateSchema(create_task_query_validator),
  taskController.createTask
);
taskRoutes.get("/:id", taskController.getTaskById);
taskRoutes.get("/", taskController.getTasks);
taskRoutes.put(
  "/:id",
  validateSchema(update_task_query_validator),
  taskController.updateTask
);
taskRoutes.delete("/:id", taskController.deleteTask);

export default taskRoutes;
