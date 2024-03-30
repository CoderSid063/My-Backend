import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "15kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

/**
 * routes import
 * u can import by "anyname" but the path  should be correct.
 */
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
/**
 * i am not using "app.get" bcz i am importing routes not declearing in app.js file.
 *
 * so to get the router i must use  middleware like :- "app.use( ,()=>{})".
 */

/**
 * "https://localhost:8000/api/v1/users" this is a prefix.
 * after this prefix it activate the "userRouter" and the final url is : "https://localhost:8000/api/v1/users/register".
 */

export { app };
