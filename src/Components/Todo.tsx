import React, {FC} from "react"
import { TodoType } from "../Types/Todo"
import { Card } from "./Card"
import "./Todo.css"
import { useRemoveTodoMutation } from "../redux/apiSlice"
interface Props{
    todo: TodoType
}
export const Todo:FC<Props> = ({todo})=>{
    const [removeTodo, result] = useRemoveTodoMutation()
    const handleRemove = (event: React.MouseEvent<HTMLInputElement>) =>{
        event.preventDefault()
        removeTodo(todo.id)
    }
    return (
        <Card vertical={false}>
            <div className="horizontal-flex">
                <input type="checkbox" checked={todo.finished}/> 
                <h4>{todo.name}</h4>
            </div>
            <input type="button" value="remove" onClick={handleRemove}/>
        </Card>
    )
}