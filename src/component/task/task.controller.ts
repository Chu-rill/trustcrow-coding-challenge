import { Request, Response } from "express";
import taskService from "./task.service";

class TaskController {
  async createTask(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const userId = req.user?.id as string;
    try {
      const response = await taskService.createTask(title, description, userId);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Create task error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response = await taskService.getTaskById(Number(id));
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get task error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getTasks(req: Request, res: Response): Promise<Response> {
    const userId = req.user?.id as string;
    try {
      const response = await taskService.getTasks(userId);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get tasks error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const response = await taskService.updateTask(
        Number(id),
        title,
        description
      );
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update task error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response = await taskService.deleteTask(Number(id));
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete task error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new TaskController();
