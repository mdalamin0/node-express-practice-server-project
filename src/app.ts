import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import fs from "fs";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./modules/user/user.routes";
import { profileRouter } from "./modules/profile/profile.routes";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHanlder from "./middleware/globalErrorHandler";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text()); // this method for text formate
app.use(express.urlencoded({ extended: true })); //this method for url form formate
app.use(cookieParser());
// custome middleware
app.use(logger);
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    author: "Alamin",
  });
});

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/auth", authRouter);

// Global Error Handling Middleware
app.use(globalErrorHanlder);

export default app;
