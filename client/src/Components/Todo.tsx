import React, { FC } from "react";
import { TodoType } from "../Types/Todo";
import { Card } from "./Card";
import {
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "../redux/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";
import axios from "axios";

interface Props {
  todo: TodoType;
}

export const Todo: FC<Props> = ({ todo }) => {
  const [removeTodo, removeResult] = useRemoveTodoMutation();
  const [updateTodo, updateResult] = useUpdateTodoMutation();

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeTodo(todo._id);
  };

  const handleCompletedChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const finished = event.target.checked;
    updateTodo({ _id: todo._id, finished });

    // if task is marked complete and has an appId, call the reward endpoint
    if (finished && todo.appId) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/reward/complete`,
          { appId: todo.appId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Reward completed for appId:", todo.appId);
      } catch (error) {
        console.error("Error calling reward completion:", error);
      }
    }
  };

  return (
    <Card>
      <div className="inline-flex space-x-2 items-center">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 cursor-pointer"
          checked={todo.finished}
          onChange={handleCompletedChange}
        />
        <div className="text-lg">{todo.name}</div>
      </div>
      <button
        onClick={handleRemove}
        className="
          hover:outline-teal-500 hover:border-teal-500
          focus:outline-teal-500 focus-within:border-teal-500
          hover:shadow-xl hover:text-red-500 hover:-rotate-12"
      >
        {removeResult.isLoading ? (
          <Spinner length={4} />
        ) : (
          <FontAwesomeIcon icon={faTrash} />
        )}
      </button>
    </Card>
  );
};
