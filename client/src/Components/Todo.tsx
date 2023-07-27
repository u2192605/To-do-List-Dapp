import React, { FC } from "react";
import { TodoType } from "../Types/Todo";
import { Card } from "./Card";
import {
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "../redux/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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

  const handleCompletedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    updateTodo({ _id: todo._id, finished: event.target.checked });
  };

  return (
    <Card
    >
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
      hover:shadow-xl hover:text-red-500  hover:-rotate-12"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </Card>
  );
};
