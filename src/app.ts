import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/user/user.routes";
import { profileRouter } from "./modules/profile/profile.routes";
import { authRouter } from "./modules/auth/auth.route";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text()); // this method for text formate
app.use(express.urlencoded({ extended: true })); //this method for url form formate
app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/auth", authRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("hello world this is next level student.");
});

export default app;
