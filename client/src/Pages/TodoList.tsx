import { Todo } from "../Components/Todo";
import { Card } from "../Components/Card";

import { ItemType } from "../Types/Item";
import {
  useAddTodoMutation,
  useGetTodosByCategoryIDQuery,
} from "../redux/apiSlice";
import { useLocation, useParams } from "react-router-dom";
import { AddItem } from "../Components/addItem";

export const TodoList = () => {
  const { ID } = useParams();
  const { state } = useLocation();
  const { data, error, isLoading } = useGetTodosByCategoryIDQuery(ID ?? "");
  const [addTodo, result] = useAddTodoMutation();
  const handleAddItem = (item: ItemType) => {
    addTodo({
      name: item.content,
      finished: false,
      categoryID: ID,
    });
  };
  return (
    <>
      <div
        className="flex flex-col justify-start items-center w-8/12 h-full
        mx-auto space-y-6"
      >
        <div
          className="text-2xl mt-6"
        >
          {state.name}</div>
        {data?.map((value) => {
          return <Todo todo={value} key={value._id}></Todo>;
        })}
      </div>
      <AddItem
        onAddItem={(item) => {
          handleAddItem(item);
        }}
      />
    </>
  );
};
