import express from "express";
import { deleteTodo, getTodosByCategoryID, updateTodo, addTodo } from "../controllers/todoController";
import { requireAuth } from "../../middleware/requireAuth";

export const todosRouter = express.Router()
todosRouter.use(requireAuth)

  // get
todosRouter.get("/:categoryID", getTodosByCategoryID);


//post
todosRouter.post("/", addTodo);

//delete
todosRouter.delete("/:ID", deleteTodo);

//patch
todosRouter.patch("/:ID", updateTodo);
