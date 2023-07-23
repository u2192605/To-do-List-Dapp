import { Request, Response } from "express";
import { Todo } from "../models/todoModel";

// get
export const getTodosByCategoryID =  async (req: Request, res: Response) => {
    const categoryID = req.params.categoryID
    const userID = (req as any).user?._id
    console.log(categoryID)
    try {
        const categories = await Todo.find({categoryID, userID});
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "couldn't fetch the document" });
    }
};

//post

export const addTodo = async (req: Request, res: Response) => {
    const todo = req.body;
    todo.userID = (req as any)?.user._id
    try {
        const result = await Todo.create(todo);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "couldn't insert the document" });
    }
};

//delete
export const deleteTodo =  async (req: Request, res: Response) => {
    const ID = req.params.ID;
    try {
        const result = await Todo.findByIdAndDelete(ID);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't delete the document" });
    }
};

//patch
export const updateTodo = async (req: Request, res: Response) => {
    const ID = req.params.ID;
    const updates = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(ID, updates);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't update the document" });
    }
};
