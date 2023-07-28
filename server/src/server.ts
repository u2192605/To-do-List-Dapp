import express, { Request, Response, NextFunction, Express } from "express";
import mongoose from "mongoose";
import { categoriesRouter } from "./routes/categories";
import { todosRouter } from "./routes/todos";
import bodyParser from 'body-parser'
import cors from 'cors'
import { usersRouter } from "./routes/users";
// require('dotenv').config('../.env')
let app: Express;

app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000',
    'https://to-do-list-xa8y.onrender.com',]
}))
app.use("/api/categories", categoriesRouter);
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send("hello world");
  } catch (error) {
    next(error);
  }
});

//connect to db
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    app.listen(process.env.PORT, () => {
      console.log(`listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error)

  }

}

connectToDB()