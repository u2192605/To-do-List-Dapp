import express, { Router, Request, Response } from "express";
import { addTodoToCategory, deleteTodo, getTodosByCategoryID, initTodosSerivce, updateTodo } from "../services/todos_service";
import { Todo } from "../types/todo";

export const getTodosRouter = (): Router => {
  initTodosSerivce()
  const todosRouter = express.Router();
  // get
  todosRouter.get("/:categoryID", async (req: Request, res: Response) => {
    const categoryID = req.params.categoryID
    try {
      const categories = await getTodosByCategoryID(categoryID);
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "couldn't fetch the document" });
    }
  });

  //post

  todosRouter.post("/", async (req: Request, res: Response) => {
    const todo: Todo = req.body;
    try {
      const result = await addTodoToCategory(todo);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "couldn't insert the document" });
    }
  });

  //delete
  todosRouter.delete("/:ID", async (req: Request, res: Response) => {
    const ID = req.params.ID;
    try {
      const result = await deleteTodo(ID);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Couldn't delete the document" });
    }
  });

  //patch
  todosRouter.patch("/:ID", async (req: Request, res: Response) => {
    const ID = req.params.ID;
    const updates = req.body;
    try {
      const result = await updateTodo(ID, updates);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Couldn't update the document" });
    }
  });
  return todosRouter
};
