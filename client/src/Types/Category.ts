import { TodoType } from "./Todo";

export type CategoryType = {
    _id: string;
    name: string;
    color: string;
    todos:TodoType[];
}
