import { Collection, Db, ObjectId } from "mongodb"
import { getDB } from "../db"
import { Todo } from "../types/todo"


let collection: Collection<Todo>
export const initTodosSerivce = ()=>{
    collection = getDB().collection('todos')
}

//get
export const getTodosByCategoryID = async (categoryID: string)=>{
    const todos = collection.find({categoryID: new ObjectId(categoryID)}).toArray()
    return todos
}

//post
export const addTodoToCategory = async (todo:Todo) =>{
    const result = collection.insertOne(todo)
    return result
}

//patch
export const updateTodo = async(todoID: string, updates: Partial<Todo>) =>{
    const result = collection.updateOne({_id: new ObjectId(todoID)}, updates)
    return result
}

//delete
export const deleteTodo = async (todoID: string)=>{
    const result = collection.deleteOne({_id: new ObjectId(todoID)})
}