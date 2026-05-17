import type { Request, Response } from "express";
import { profileServices } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileServices.createProfileIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows[0],
    });
    console.log(result);
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get profile
const getProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileServices.getProfileFromDB();
    res.status(200).json({
      success: true,
      message: "Profiles retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get single profile
const getSingleProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await profileServices.getSingleProfileFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Profile not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Single Profile retrived successfully",
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

// update profile data
const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await profileServices.updateProfileInDB(
      req.body,
      id as string,
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Profile not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Update Profile successfully",
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

// delete profile
const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await profileServices.deleteProfileFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Profile not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "delete Profile successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  createProfile,
  getProfile,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
