import { Router } from "express";
<<<<<<< HEAD:src/routes/user.routes.ts
import userController from "../component/user/user.controller";
import { protect } from "../middleware/jwt";
=======
import userController from "./user.controller";
import { protect } from "../../middleware/jwt";
>>>>>>> component:src/component/user/user.routes.ts

const userRoutes = Router();

userRoutes.get("/users", protect, userController.getAllUsers);
userRoutes.get("/user/:id", protect, userController.getUser);
userRoutes.put("/user/:id", protect, userController.updateUser);
userRoutes.delete("/deleteUser/:id", protect, userController.deleteUser);

export default userRoutes;
