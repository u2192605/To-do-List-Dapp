import React, {FC} from "react"
import { TodoType } from "../Types/Todo"
import { Card } from "./Card"
import "./Todo.css"
interface Props{
    todo: TodoType
}
export const Todo:FC<Props> = ({todo})=>{
    return (
        <Card vertical={false}>
            <div className="horizontal-flex">
                <input type="checkbox" checked={todo.finished}/> 
                <h4>{todo.name}</h4>
            </div>
            <input type="button" value="remove"/>
        </Card>
    )
}