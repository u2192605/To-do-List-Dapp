import { Action } from "redux";
import { CategoryType } from "../Category";

export enum Actions{
    ADD = "ADD",
    DELETE = "DELETE",
}

export type CategoriesActionTypes = {
    type: Actions;
    category?:CategoryType;
}