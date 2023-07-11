import React, {FC} from "react"
import { Todo } from "../Types/Todo"
import { Card } from "./Card"
interface Props{
    todo: Todo
}
export const TodoItem:FC<Props> = ({todo})=>{
    return (
        <Card vertical={false}>
            <input type="checkbox" checked={todo.finished}/> 
            <h4>{todo.title}</h4>
            <input type="button" value="remove"/>
        </Card>
    )
}