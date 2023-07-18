import { Todo } from "../Components/Todo";
import { Card } from "../Components/Card";

import { v4 as uuidv4 } from 'uuid';
import { ItemType } from "../Types/Item";
import { useAddTodoMutation, useGetCategoryByIDQuery } from "../redux/apiSlice";
import { useParams } from "react-router-dom";
import { AddItem } from "../Components/addItem";

export const TodoList = () => {
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
                            <Todo todo={value}></Todo>
                        )
                    })}
                </ul>

            </Card>
            <AddItem onAddItem={(item) => { handleAddItem(item) }} />
        </>
    )
}