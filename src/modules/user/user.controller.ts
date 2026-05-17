import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

// create user
const {createUserIntoDB, getAllUserFromDB, getSingleUserFromDB, updateUserIntoDB, deleteUserFromDB} = userService;
const createUser = async (req: Request, res: Response) => {
  // const { name, email, password, age } = req.body;
  try {
    const result = await createUserIntoDB(req.body)
    console.log(result);
    res.status(201).json({
      success: true,
      message: "User Created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get user from db

const getAllUser = async (req: Request, res:Response) => {
  try {
   const users = await getAllUserFromDB();
    console.log(users);
    res.status(200).json({
      success: true,
      message: "users retrived successfully!",
      data: users.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// get single user by id
const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await getSingleUserFromDB(id as string)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Single user retrived successfully",
      data: result.rows,
    });
    console.log(result.rows);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// update user 

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { name, password, is_active, age } = req.body;
  try {
    const result = await updateUserIntoDB(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
    console.log(result.rows);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// delete user

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
    console.log(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};
