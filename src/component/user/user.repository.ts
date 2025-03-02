import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByUsername(
    username: string
  ): Promise<Pick<User, "id" | "username" | "email" | "password"> | null> {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });
  }

  async createUser({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: { username, password, email },
    });
  }
}

export default new UserRepository();
