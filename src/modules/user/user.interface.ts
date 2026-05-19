//  export enum UserRole {
//   ADMIN = "admin",
//   AGENT = "agent",
//   USER = "user",
// }

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  role?: string;
  is_active?: boolean;
}

export const User_Roles = {
  admin: "admin",
  agent: "agent",
  user: "user",
} as const;

// q1 == role ke kibabe amra enum a convert korte pari
