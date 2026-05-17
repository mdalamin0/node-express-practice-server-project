import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
  const { user_id, bio, address, phone, gender } = payload;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [user_id],
  );
  if (user.rows.length === 0) {
    throw new Error("User not found!");
  }
  const result = await pool.query(
    `
    INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );
  return result;
};

// get profile from DB
const getProfileFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM profiles
    `);
  return result;
};

// get single profile from DB
const getSingleProfileFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM profiles WHERE id=$1
    `,
    [id],
  );
  return result;
};

// update profile in DB
const updateProfileInDB = async (payload: any, id: string) => {
  const { bio, address, phone, gender } = payload;
  const result = await pool.query(
    `
  UPDATE profiles SET 
  bio=COALESCE($1, bio),
  address=COALESCE($2, address),
  phone=COALESCE($3, phone),
  gender=COALESCE($4, gender)
  WHERE id=$5 RETURNING *
  `,
    [bio, address, phone, gender, id],
  );
  return result;
};

// delete profile from DB

const deleteProfileFromDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM profiles WHERE id=$1`, [id]);
  return result;
};

export const profileServices = {
  createProfileIntoDB,
  getProfileFromDB,
  getSingleProfileFromDB,
  updateProfileInDB,
  deleteProfileFromDB,
};
