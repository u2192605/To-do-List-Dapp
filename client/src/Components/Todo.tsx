import React, { FC } from "react"
import { TodoType } from "../Types/Todo"
import { Card } from "./Card"
import "./Todo.css"
import { useRemoveTodoMutation, useUpdateTodoMutation } from "../redux/apiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
interface Props {
    todo: TodoType
}
export const Todo: FC<Props> = ({ todo }) => {
    const [removeTodo, removeResult] = useRemoveTodoMutation()
    const [updateTodo, updateResult] = useUpdateTodoMutation()
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeTodo(todo.id)
    }

    const handleCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        updateTodo({ id: todo.id, finished: event.target.checked })
    }

    return (
        <Card vertical={false}>
            <div className="horizontal-flex">
                <input type="checkbox" checked={todo.finished} onChange={handleCompletedChange} />
                <h4>{todo.name}</h4>
            </div>
            <button className="fit-content" onClick={handleRemove}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </Card>
    )
}