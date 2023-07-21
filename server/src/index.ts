import { Request, Response, NextFunction, Express } from "express";
import { connectToDB, getDB } from "./db";
import { getExpressApp, initExpressApp } from "./app";
import { Db } from "mongodb";
import { getCategoriesRouter } from "./routes/categories_routes";

let app: Express;
const PORT = 5000;
let db: Db;

initExpressApp();
app = getExpressApp();

//db connection
connectToDB((error?: Error) => {
  if (!error) {
    const categoriesRouter = getCategoriesRouter();
    app.use("/api/categories", categoriesRouter);
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
