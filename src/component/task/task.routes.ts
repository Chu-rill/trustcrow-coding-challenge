import { Router } from "express";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  create_task_query_validator,
  update_task_query_validator,
} from "./task.validation";
import taskController from "./task.controller";
import { authenticate } from "../../middleware/jwt";
const taskRoutes = Router();

taskRoutes.post(
  "/",
  authenticate,
  validateSchema(create_task_query_validator),
  taskController.createTask
);
taskRoutes.get("/:id", authenticate, taskController.getTaskById);
taskRoutes.get("/", authenticate, taskController.getTasks);
taskRoutes.put(
  "/:id",
  authenticate,
  validateSchema(update_task_query_validator),
  taskController.updateTask
);
taskRoutes.delete("/:id", authenticate, taskController.deleteTask);

export default taskRoutes;
