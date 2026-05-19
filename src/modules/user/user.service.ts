import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;
  const hashPassowrd = await bcrypt.hash(password, 10);
  console.log(hashPassowrd);
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, age, role) VALUES($1,$2,$3,$4,COALESCE($5, 'user')) RETURNING *
  `,
    [name, email, hashPassowrd, age, role],
  );
  delete result.rows[0].password;
  delete result.rows[0].is_active;
  return result;
}

const getAllUserFromDB = async () => {
   const users = await pool.query(`SELECT * FROM users`);
   return users;
}

const getSingleUserFromDB = async (id: string) => {
  // const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUserIntoDB = async(payload: IUser, id: string) => {
  const { name, password, is_active, age} = payload;
const result = await pool.query(
  `UPDATE users SET 
      name=COALESCE($1,name), 
      password=COALESCE($2, password), 
      is_active=COALESCE($3, is_active),
      age=COALESCE($4, age)
      WHERE id=$5 RETURNING *`,
  [name, password, is_active, age, id],
);
return result;
}

// delete user from db
const deleteUserFromDB =async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
}


export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB
}