import mongoose, { Model, ObjectId } from 'mongoose'
const Schema = mongoose.Schema

export interface ITodo {
    _id: ObjectId,
    name: string,
    finished: boolean,
    categoryID: string,
    userID: string,
}

interface TodoModel extends Model<ITodo>{

}

const todoSchema = new Schema<ITodo, TodoModel>({
    name: { type: String, required: true, },
    finished: { type: Boolean, required: true },
    categoryID: { type: String, required: true },
    userID: { type: String, required: true }
})

export const Todo = mongoose.model<ITodo, TodoModel>('Todo', todoSchema)