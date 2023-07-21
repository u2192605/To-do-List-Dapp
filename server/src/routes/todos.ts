import express from "express";
import { deleteTodo, getTodosByCategoryID, updateTodo, addTodo } from "../controllers/todoController";

export const todosRouter = express.Router()

  // get
todosRouter.get("/:categoryID", getTodosByCategoryID);


//post
todosRouter.post("/", addTodo);

//delete
todosRouter.delete("/:ID", deleteTodo);

//patch
todosRouter.patch("/:ID", updateTodo);
