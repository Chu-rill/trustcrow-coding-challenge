// Define various response types
export type LoginResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  user: { username: string; id: string };
  token?: string;
};
export type CreateUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  user: { username: string; email: string };
};
