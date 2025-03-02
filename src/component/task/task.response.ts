import { Task } from "@prisma/client";

export type TaskResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: { id: number; title: string; description: string; userId: string };
};

export type TasksResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: Task[];
};
