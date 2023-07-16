import { TodoItem } from "./TodoItem";
import { Card } from "./Card";

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ItemType } from "../Types/Item";
import { addTodo } from "../redux/todoSlice";
import { AddItem } from "./addItem";

export const TodosContainer = () => {
    const { category, todos } = useSelector((state: RootState) => state.todo)
    const dispatch = useDispatch()
    const handleAddItem = (item: ItemType) => {
        const id = uuidv4()
        dispatch(addTodo({
            id,
            name: item.content,
            finished: false
        }))
    }
    return (
        <>
            <Card vertical={true}>
                <h3>{category}</h3>
                <ul style={{ listStyle: 'none' }}>
                    {todos.map((value) => {
                        return (
                            <li key={uuidv4()}>
                                <TodoItem todo={value}></TodoItem>
                            </li>
                        )
                    })}
                </ul>
            </Card>
            <AddItem onAddItem={(item) => { handleAddItem(item) }} />
        </>
    )
}