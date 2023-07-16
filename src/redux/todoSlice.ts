import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../Types/Todo";

export interface TodosSate {
  category:string,
  todos: TodoType[];
}

const initialState: TodosSate = {
  category: '',
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.splice(
        state.todos.findIndex((todo) => todo.id === action.payload.id),
        1);
    },
  },
});

export const {addTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer
