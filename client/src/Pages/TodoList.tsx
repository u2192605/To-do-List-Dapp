import { Todo } from "../Components/Todo";
import { Card } from "../Components/Card";

import { v4 as uuidv4 } from 'uuid';
import { ItemType } from "../Types/Item";
import { useAddTodoMutation, useGetTodosByCategoryIDQuery } from "../redux/apiSlice";
import { useLocation, useParams } from "react-router-dom";
import { AddItem } from "../Components/addItem";

export const TodoList = () => {
    const { ID } = useParams();
    const {state} = useLocation()
    const { data, error, isLoading } = useGetTodosByCategoryIDQuery(ID ?? '')
    const [addTodo, result] = useAddTodoMutation();
    // const dispatch = useDispatch()
    const handleAddItem = (item: ItemType) => {
        addTodo({
            name: item.content,
            finished: false,
            categoryID: ID
        })
    }
    return (
        <>
            <Card vertical={true}>
                <h3>{state.name}</h3>
                {data?.map((value) => {
                    return (
                        <Todo todo={value} key={value._id}></Todo>
                    )
                })}
            </Card>
            <AddItem onAddItem={(item) => { handleAddItem(item) }} />
        </>
    )
}