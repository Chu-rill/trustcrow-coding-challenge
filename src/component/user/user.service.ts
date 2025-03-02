import jwt from "jsonwebtoken";
import { comparePassword, encrypt } from "../../utils/encryption";
import {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
} from "../../error/error";
import httpStatus from "http-status";
import userRepository from "./user.repository";
import {
  LoginResponse,
  CreateUserResponse,
  User,
} from "./user.response";

class UserService {
  async loginUser(
    username: string,
    password: string
  ): Promise<
    | LoginResponse
    | typeof doesNotExistError
    | typeof passwordMismatchError
    | typeof defaultError
  > {
    try {
      const user = (await userRepository.getUserByUsername(
        username
      )) as UserDocument;
      if (!user) return doesNotExistError;

      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) return passwordMismatchError;

      const userId = user._id.toString();
      const payload = { username: user.username, id: userId };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        user: { username: user.username, id: userId }, // Ensure _id is a string
        token,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async createUser(
    username:string, password:string, email:string
  ): Promise<
    CreateUserResponse | typeof noDuplicateError | typeof defaultError
  > {
    try {
      const existingUser = await userRepository.getUserByUsername(username);
      if (existingUser) return noDuplicateError;

      const hashedPassword = await encrypt(password);
      // const { username, email, password } = dto;
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
      return defaultError;
    }
  }
}

export default new UserService();
