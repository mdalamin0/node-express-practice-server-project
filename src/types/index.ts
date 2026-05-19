export type Roles = "admin" | "agent" | "user";

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?:any
}