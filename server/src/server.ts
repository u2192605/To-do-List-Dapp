import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { categoriesRouter } from "./routes/categories";
import { todosRouter } from "./routes/todos";
import { usersRouter } from "./routes/users";
import rewardRouter from "./routes/reward";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://to-do-list-delta-seven.vercel.app"
  ]
}));

app.use("/api/categories", categoriesRouter);
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/reward", rewardRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("hello world");
  } catch (err) {
    next(err);
  }
});


const connectToDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB Atlas");

    app.listen(process.env.PORT, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

connectToDB();
