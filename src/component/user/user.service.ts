import jwt from "jsonwebtoken";
import { comparePassword, encrypt } from "../../utils/encryption";
import {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
  createErrorResponse,
} from "../../error/error";
import httpStatus from "http-status";
import userRepository from "./user.repository";
import { LoginResponse, CreateUserResponse } from "./user.response";

class UserService {
  async loginUser(
    username: string,
    password: string
  ): Promise<
    | LoginResponse
    | typeof doesNotExistError
    | typeof passwordMismatchError
    | typeof defaultError
    | typeof createErrorResponse
  > {
    try {
      const user = await userRepository.findByUsername(username);
      if (!user) return doesNotExistError;

      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) return passwordMismatchError;

      const payload = { username: user.username, id: user.id };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        user: { username: user.username, id: user.id },
        token,
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse(
        "All fields are required",
        httpStatus.BAD_REQUEST
      );
    }
  }

  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<
    | CreateUserResponse
    | typeof noDuplicateError
    | typeof defaultError
    | typeof createErrorResponse
  > {
    try {
      const existingUser = await userRepository.findByUsername(username);
      if (existingUser) return noDuplicateError;

      const hashedPassword = await encrypt(password);
      const user = await userRepository.createUser({
        username,
        email,
        password: hashedPassword,
      });

      if (!user) return defaultError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        user: { username, email },
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse(
        "Invalid username or password",
        httpStatus.UNAUTHORIZED
      );
    }
  }
}

export default new UserService();
