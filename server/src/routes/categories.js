"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const requireAuth_1 = require("../../middleware/requireAuth");
exports.categoriesRouter = express_1.default.Router();
exports.categoriesRouter.use(requireAuth_1.requireAuth);
// get
exports.categoriesRouter.get("/", categoryController_1.getCategories);
//post
exports.categoriesRouter.post("/", categoryController_1.addCategory);
//delete
exports.categoriesRouter.delete("/:ID", categoryController_1.deleteCategory);
//patch
exports.categoriesRouter.patch("/:ID", categoryController_1.updateCateogry);
