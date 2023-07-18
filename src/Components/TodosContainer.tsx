import { TodoItem } from "./TodoItem";
import { Card } from "./Card";

import { v4 as uuidv4 } from 'uuid';
import { ItemType } from "../Types/Item";
import { useAddTodoMutation, useGetCategoryByIDQuery } from "../Services/CategoryAPI";
import { useParams } from "react-router-dom";
import { AddItem } from "./addItem";

export const TodosContainer = () => {
    const { ID } = useParams();
    const { data, error, isLoading } = useGetCategoryByIDQuery(ID ?? '')
    const [addTodo, result] = useAddTodoMutation();
    console.log(data, 'd')
    // const dispatch = useDispatch()
    const handleAddItem = (item: ItemType) => {
        const id = uuidv4()
        addTodo({
            id,
            name: item.content,
            finished: false,
            categoryId: ID
        })
    }
    return (
        <>
            <Card vertical={true}>
                <h3>{data?.name}</h3>
                <ul style={{ listStyle: 'none' }}>
                    {data?.todos.map((value) => {
                        return (
                            <TodoItem todo={value}></TodoItem>
                        )
                    })}
                </ul>

            </Card>
            <AddItem onAddItem={(item) => { handleAddItem(item) }} />
        </>
    )
}