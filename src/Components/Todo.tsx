import React, {FC} from "react"
import { TodoType } from "../Types/Todo"
import { Card } from "./Card"
interface Props{
    todo: TodoType
}
export const Todo:FC<Props> = ({todo})=>{
    return (
        <Card vertical={false}>
            <input type="checkbox" checked={todo.finished}/> 
            <h4>{todo.name}</h4>
            <input type="button" value="remove"/>
        </Card>
    )
}