"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const requireAuth_1 = require("../../middleware/requireAuth");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.use(requireAuth_1.requireAuth);
// get
exports.todosRouter.get("/:categoryID", todoController_1.getTodosByCategoryID);
//post
exports.todosRouter.post("/", todoController_1.addTodo);
//delete
exports.todosRouter.delete("/:ID", todoController_1.deleteTodo);
//patch
exports.todosRouter.patch("/:ID", todoController_1.updateTodo);
