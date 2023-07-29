import { Todo } from "../Components/Todo";
import { Card } from "../Components/Card";

import { ItemType } from "../Types/Item";
import {
  useAddTodoMutation,
  useGetTodosByCategoryIDQuery,
} from "../redux/apiSlice";
import { useLocation, useParams } from "react-router-dom";
import { AddItem } from "../Components/addItem";
import { useState } from "react";
import { PaginationManager } from "../Components/PaginationManager";

export const TodoList = () => {
  const [page, setPage] = useState(0);
  const { ID } = useParams();
  const { state } = useLocation();
  const { data, error, isLoading } = useGetTodosByCategoryIDQuery({
    categoryID: ID || "",
    page,
  });
  const [addTodo, result] = useAddTodoMutation();
  const handleAddItem = (item: ItemType) => {
    addTodo({
      name: item.content,
      finished: false,
      categoryID: ID,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col justify-start items-center w-7/12 h-full
        mx-auto space-y-6"
      >
        <div className="text-2xl mt-6">{state.name}</div>
        {data?.todos.map((value) => {
          return <Todo todo={value} key={value._id}></Todo>;
        })}
        <PaginationManager
          page={page}
          totalPages={data?.totalPages || 0}
          changePage={setPage}
        />
      </div>
      <AddItem
        onAddItem={(item) => {
          handleAddItem(item);
        }}
      />
    </div>
  );
};
