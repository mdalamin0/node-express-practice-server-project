import { Router } from "express";

import { userController } from "./user.controller";

const router = Router();
const {createUser, getAllUser, getSingleUser, updateUser,deleteUser} = userController;
// create user from database
router.post("/", createUser);

// get users from database
router.get("/", getAllUser );

// get single user from database
router.get("/:id", getSingleUser);

// update user
router.put("/:id", updateUser);


// delete user from database
router.delete("/:id", deleteUser );

export const userRouter = router;
