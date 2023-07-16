import { TodoType } from "./Todo";

export type CategoryType = {
    id: string;
    name: string;
    todos?:TodoType[];
}