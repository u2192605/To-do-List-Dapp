import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
// get

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "couldn't fetch the document" });
    }
};


//post
export const addCategory =  async (req: Request, res: Response) => {
    const category = req.body;
    try {
        const result = await Category.create(category);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "couldn't insert the document" });
    }
};

export //delete
const deleteCategory =  async (req: Request, res: Response) => {
    const ID = req.params.ID;
    try {
        const result = await Category.findByIdAndDelete(ID);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't delete the document" });
    }
};

//patch
export const updateCateogry =  async (req: Request, res: Response) => {
    const ID = req.params.ID;
    const updates = req.body;
    try {
        const result = await Category.findByIdAndUpdate(ID, updates);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't update the document" });
    }
};
