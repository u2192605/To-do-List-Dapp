import express, { Request, Response, Router } from "express";
import {
  addCategory, deleteCategory, getCategories, updateCateogry,
} from "../controllers/categoryController";
import { requireAuth } from "../middleware/requireAuth";


export const categoriesRouter = express.Router();
categoriesRouter.use(requireAuth)
// get
categoriesRouter.get("/",getCategories);


//post
categoriesRouter.post("/", addCategory);

//delete
categoriesRouter.delete("/:ID", deleteCategory);

//patch
categoriesRouter.patch("/:ID", updateCateogry);
