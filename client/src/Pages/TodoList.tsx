import { AddItem } from "../Components/AddItemComponent";
import { Todo } from "../Components/Todo";

import { ItemType } from "../Types/Item";
import {
  api,
  useAddTodoMutation,
  useGetTodosByCategoryIDQuery,
} from "../redux/apiSlice";
import { redirect, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { PaginationManager } from "../Components/PaginationManager";
import { Spinner } from "../Components/Spinner";
import { List } from "../Components/List";
import { store } from "../redux/store";

export const Component = () => {
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

  if (data && data.totalPages !== 0 && data.totalPages < page + 1) {
    console.log(page, data.totalPages, "here");
    setPage(data.totalPages - 1);
  }

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

Component.displaName = "TodoList";

export const loader = async ({ params }: any) => {
  const token = store.getState().auth.token;
  if (!token) {
    throw redirect("/login");
  }
  const p = store.dispatch(
    api.endpoints.getTodosByCategoryID.initiate(params.ID ?? "")
  );
  try {
    const response = await p.unwrap();
    return response;
  } catch (error) {
    return error;
  } finally {
    p.unsubscribe();
  }
};

loader.displayName = "TodoListLoader";
