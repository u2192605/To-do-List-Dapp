import { AddItem } from "../Components/AddItemComponent";
import { Todo } from "../Components/Todo";

import { ItemType } from "../Types/Item";
import {
  useAddTodoMutation,
  useGetTodosByCategoryIDQuery,
} from "../redux/apiSlice";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { PaginationManager } from "../Components/PaginationManager";
import { Spinner } from "../Components/Spinner";
import { List } from "../Components/List";

export const TodoList = () => {
  const [page, setPage] = useState(0);
  const { ID } = useParams();
  const { state } = useLocation();
  const { data, error, isLoading } = useGetTodosByCategoryIDQuery({
    categoryID: ID || "",
    page,
  });
  const [addTodo, addTodoResult] = useAddTodoMutation();
  const handleAddItem = (item: ItemType) => {
    addTodo({
      name: item.content,
      finished: false,
      categoryID: ID,
    });
  };

  const todos = data?.todos.map((value) => {
    return <Todo todo={value} key={value._id}></Todo>;
  });
  return (
    <List
      totalPages={data?.totalPages || 0}
      children={{
        title: <div className="text-2xl mt-6">{state.name}</div>,
        items: isLoading ? <Spinner /> : todos,
        paginationManager: data?.totalPages ? (
          <PaginationManager
            page={page}
            totalPages={data?.totalPages || 0}
            changePage={setPage}
          />
        ) : (
          <div className="text-xl">Nothing yet</div>
        ),
        AddItem: (
          <AddItem
            onAddItem={(item) => {
              handleAddItem(item);
            }}
            isPerformingQuery={addTodoResult.isLoading}
          />
        ),
      }}
    />
  );
};
