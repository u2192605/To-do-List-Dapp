import { CategoryType } from "./Category";
import { TodoType } from "./Todo";

export interface PaginatedCategories{
    categories: CategoryType[],
    totalPages: number,
}
export interface PaginatedTodos{
    todos: TodoType[],
    totalPages: number,
}