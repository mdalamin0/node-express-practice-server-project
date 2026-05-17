import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db";
import type { ILoginUser } from "./auth.interface";
import config from "../../config/env";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email =$1
    `,
    [email],
  );
  // check if the user exists
  if (userData.rows.length === 0) {
    throw new Error("Invalid credintials!");
  }
  const user = userData.rows[0];
  const mathcPassword = await bcrypt.compare(password, user.password);

  if (!mathcPassword) {
    throw new Error("Invalid credintials!");
  }

  // genarate token

  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtpayload, config.secret_key as string, {
    expiresIn: "1d",
  });
  return {accessToken};
};

export const authServices = {
  loginUserIntoDB,
};
