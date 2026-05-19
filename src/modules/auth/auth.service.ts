import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
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
    role: user.role,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtpayload, config.secret_key as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtpayload, config.refresh_secret_key as string, {
    expiresIn: "10d",
  });
  return {accessToken, refreshToken};
};

export const genarateRefreshToken = async (token: string) => {
const decoded = jwt.verify(token, config.refresh_secret_key as string ) as JwtPayload

const userData = await pool.query(`
  SELECT * FROM users WHERE email=$1
  `, [decoded.email])
  console.log("from auth service : ", userData.rows[0]);
  const user = userData.rows[0];
  if(userData.rows.length === 0){
    throw new Error("User not found")
  }

  if(!user?.is_active){
    throw new Error("Forbidden! User not active!")
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active
  };

  const accessToken = jwt.sign(jwtpayload, config.secret_key as string, {
    expiresIn: "1d"
  })
  return {accessToken}
}


export const authServices = {
  loginUserIntoDB,
  genarateRefreshToken
};
