import { Request, Response } from "express";
import { Todo } from "../models/todoModel";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const runPython = promisify(execFile);


export const getTodosByCategoryID = async (req: Request, res: Response) => {
  const categoryID = req.params.categoryID;
  const userID = (req as any).user?._id;
  const page = parseInt(req.query.page as string) || 0;
  const ELEMENTS_PER_PAGE = 4;
  try {
    const [totalDocuments, todos] = await Promise.all([
      Todo.countDocuments({ categoryID, userID }),
      Todo.find({ categoryID, userID })
        .skip(page * ELEMENTS_PER_PAGE)
        .limit(ELEMENTS_PER_PAGE),
    ]);
    const totalPages = Math.ceil(totalDocuments / ELEMENTS_PER_PAGE);
    res.status(200).json({ totalPages, todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't fetch the document" });
  }
};


export const addTodo = async (req: Request, res: Response) => {
  const todo = req.body;
  todo.userID = (req as any)?.user._id;

  try {
    const scriptPath = path.join(
      __dirname,
      "../../smartContracts/runReward.py"
    );

    if (!todo.taskDoerAddress || !todo.rewardAmount) {
      return res.status(400).json({ error: "Missing reward config" });
    }

    const { stdout } = await runPython("python", [
      scriptPath,
      todo.taskDoerAddress,
      todo.rewardAmount.toString(),
    ]);

    const result = JSON.parse(stdout);

    if (!result.success) {
      return res.status(500).json({
        error: "Smart contract creation failed",
        details: result.error,
      });
    }

    todo.appId = result.app_id;

    const dbResult = await Todo.create(todo);
    return res.status(201).json(dbResult);
  } catch (error) {
    console.error("AddTodo error:", error);
    return res
      .status(500)
      .json({ error: "Couldn't insert document", details: error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const ID = req.params.ID;
  try {
    const result = await Todo.findByIdAndDelete(ID);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't delete document" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const ID = req.params.ID;
  const updates = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(ID, updates);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't update document" });
  }
};

