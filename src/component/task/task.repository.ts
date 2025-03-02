import { PrismaClient, Task } from "@prisma/client";

class TaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createTask({
    title,
    description,
    userId,
  }: {
    title: string;
    description: string;
    userId: string;
  }): Promise<Task> {
    return this.prisma.task.create({
      data: { title, description, userId },
    });
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
      },
    });
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }
  async updateTask({
    id,
    title,
    description,
  }: {
    id: number;
    title: string;
    description: string;
  }): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { title, description },
    });
  }
  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
export default new TaskRepository();
