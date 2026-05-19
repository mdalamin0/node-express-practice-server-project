import type { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDB(req.body);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false, //in production will be true
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "successfully login user",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authServices.genarateRefreshToken(req.cookies.refreshToken);
  
    res.status(200).json({
      success: true,
      message: "successfully access token created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  refreshToken,
};
