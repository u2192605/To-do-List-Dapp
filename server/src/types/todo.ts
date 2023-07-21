import { ObjectId } from "mongodb"

export type Todo = {
    _id?: ObjectId,
    name: string,
    completed: boolean
    categoryID: string,
}