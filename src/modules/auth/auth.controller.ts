import type { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req:Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDB(req.body);
     res.status(200).json({
       success: true,
       message: "successfully login user",
       data: result
     });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

export const authController = {
  loginUser,
}