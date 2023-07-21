import { Request, Response, NextFunction, Express } from "express";
import { connectToDB, getDB } from "./db";
import { getExpressApp, initExpressApp } from "./app";
import { Db } from "mongodb";
import { getCategoriesRouter } from "./routes/categories_routes";
import { getTodosRouter } from "./routes/todos_routes";

let app: Express;
const PORT = 5000;
let db: Db;

initExpressApp();
app = getExpressApp();

//db connection
connectToDB((error?: Error) => {
  if (!error) {
    app.use("/api/categories", getCategoriesRouter());
    app.use("/api/todos",getTodosRouter());
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
    console.log("here");
    db = getDB();
  }
});

//routes
app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send("hello world");
  } catch (error) {
    next(error);
  }
});
