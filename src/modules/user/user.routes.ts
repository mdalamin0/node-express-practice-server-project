import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { User_Roles } from "./user.interface";

const router = Router();
const { createUser, getAllUser, getSingleUser, updateUser, deleteUser } =
  userController;



router.post("/", createUser);
router.get("/", auth(User_Roles.admin, User_Roles.agent), getAllUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRouter = router;
