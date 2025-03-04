import httpStatus from "http-status";
import { defaultError, createErrorResponse } from "../../error/error";
import taskRepository from "./task.repository";
import { TaskResponse, TasksResponse } from "./task.response";
import { Task } from "@prisma/client";

class TaskService {
  async createTask(
    title: string,
    description: string,
    userId: string
  ): Promise<TaskResponse | typeof createErrorResponse> {
    try {
      const task = await taskRepository.createTask({
        title,
        description,
        userId,
      });
      if (!task) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Task not created",
        };
      }
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        message: "Task created successfully",
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          userId: task.userId,
        },
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse(
        "Not authorized, no token",
        httpStatus.UNAUTHORIZED
      );
    }
  }
  async getTaskById(
    id: number
  ): Promise<TaskResponse | typeof createErrorResponse> {
    try {
      const task = await taskRepository.findTaskById(id);
      if (!task) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.NOT_FOUND,
          message: "Task not found",
        };
      }
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Task found",
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          userId: task.userId,
        },
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse(
        "Not authorized, no token",
        httpStatus.UNAUTHORIZED
      );
    }
  }
  async getTasks(
    userId: string
  ): Promise<TasksResponse | typeof createErrorResponse> {
    try {
      const tasks: Task[] = await taskRepository.getTasks(userId);
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Tasks found",
        data: tasks,
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse("Task not found", httpStatus.NOT_FOUND);
    }
  }
  async updateTask(
    id: number,
    title: string,
    description: string
  ): Promise<TaskResponse | typeof createErrorResponse> {
    try {
      const task = await taskRepository.updateTask({ id, title, description });
      if (!task) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Task not updated",
        };
      }
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Task updated successfully",
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          userId: task.userId,
        },
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse(
        "Not authorized, no token",
        httpStatus.UNAUTHORIZED
      );
    }
  }
  async deleteTask(
    id: number
  ): Promise<TaskResponse | typeof createErrorResponse> {
    try {
      const task = await taskRepository.deleteTask(id);
      if (!task) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Task not deleted",
        };
      }
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Task deleted successfully",
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          userId: task.userId,
        },
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse("Task not found", httpStatus.NOT_FOUND);
    }
  }
}
export default new TaskService();
