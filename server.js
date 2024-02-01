import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connect } from "./dbs/connect.js";
import authRouter from "./routes/authRoutes.js";
import accessRouter from "./routes/accessRoutes.js";
import activityRouter from "./routes/activityRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { accessHandler } from "./middlewares/accessMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", accessHandler, accessRouter);
app.use("/api/activity", accessHandler, activityRouter);
app.use(express.static(path.resolve(__dirname, "./public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  return res.status(400).json({ msg: "No Route Found" });
});

app.use(errorHandler);

//DATABASE
connect();

//SERVER
app.listen(port, () => {
  console.log(`Server Stated at ${port}`);
});
