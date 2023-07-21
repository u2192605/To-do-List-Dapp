import express, { Request, Response, Router } from "express";
import {
  addCategory,
  deleteCategoryByID,
  getCategories,
  getCategoryByID,
  initCategoriesService,
  updateCategory,
} from "../services/categories_service";

export const getCategoriesRouter = (): Router => {
  
  initCategoriesService()
  const categoriesRouter = express.Router();
  // get
  categoriesRouter.get("/", async (req: Request, res: Response) => {
    try {
      const categories = await getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "couldn't fetch the document" });
    }
  });

  categoriesRouter.get("/:ID", async (req: Request, res: Response) => {
    const ID = req.params.categoryID;
    try {
      const category = await getCategoryByID(ID);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "couldn't fetch the document" });
    }
  });

  //post

  categoriesRouter.post("/", async (req: Request, res: Response) => {
    const category = req.body;
    try {
      const result = await addCategory(category);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "couldn't insert the document" });
    }
  });

  //delete
  categoriesRouter.delete("/:ID", async (req: Request, res: Response) => {
    const ID = req.params.ID;
    try {
      const result = await deleteCategoryByID(ID);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Couldn't delete the document" });
    }
  });

  //patch
  categoriesRouter.patch("/:ID", async (req: Request, res: Response) => {
    const ID = req.params.ID;
    const updates = req.body;
    try {
      const result = await updateCategory(ID, updates);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Couldn't update the document" });
    }
  });
  return categoriesRouter
};
