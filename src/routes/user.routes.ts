import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { protect } from "../middleware/jwt";

const userRoutes = Router();

userRoutes.get("/users", protect, getAllUsers);
userRoutes.get("/user/:id", protect, getUser);
userRoutes.put("/user/:id", protect, updateUser);
userRoutes.delete("/deleteUser/:id", protect, deleteUser);

export default userRoutes;
