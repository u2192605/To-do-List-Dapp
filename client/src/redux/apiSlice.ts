import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CategoryType } from "../Types/Category";
import { TodoType } from "../Types/Todo";
import { AuthanticationResult } from "../Types/SignUpResult";
import { User } from "../Types/User";
import { RootState } from "./store";
import { PaginatedCategories, PaginatedTodos } from "../Types/PaginatedResults";

interface SignUpUser extends User {
  password: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      let token = state.auth.token;

      // fallback to localStorage if redux state is missing the token
      if (!token) {
        const stored = localStorage.getItem("token");
        if (stored) token = stored;
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Categories", "Todos", "Users"],
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedCategories, number>({
      query: (page = 0) => ({
        url: `categories/`,
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.categories.map(({ _id }) => ({
                type: "Categories" as const,
                id: _id,
              })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),

    addCategory: builder.mutation<CategoryType, Partial<CategoryType>>({
      query: (body) => ({
        url: "categories/",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "Categories", id: result?._id },
        { type: "Categories", id: "LIST" },
      ],
    }),

    removeCategory: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Categories", id: "LIST" },
        { type: "Todos", id: "LIST" },
      ],
    }),

    getTodosByCategoryID: builder.query<
      PaginatedTodos,
      { categoryID: string; page: number }
    >({
      query: ({ categoryID, page }) => ({
        url: `todos/${categoryID}`,
        method: "GET",
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.todos.map(({ _id }) => ({
                type: "Todos" as const,
                id: _id,
              })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),

    addTodo: builder.mutation<TodoType, Partial<TodoType>>({
      query: (body) => ({
        url: "todos/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    removeTodo: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    updateTodo: builder.mutation<
      TodoType,
      Partial<TodoType> & Pick<TodoType, "_id">
    >({
      query: ({ _id, ...patch }) => ({
        url: `todos/${_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Todos", id: arg._id },
      ],
    }),

    signUp: builder.mutation<AuthanticationResult, SignUpUser & Omit<SignUpUser, "_id">>({
      query: (user) => ({
        url: `users/signup/`,
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation<AuthanticationResult, { name: string; password: string }>({
      query: (credentials) => ({
        url: `users/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useRemoveCategoryMutation,
  useAddTodoMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetTodosByCategoryIDQuery,
  useSignUpMutation,
  useLoginMutation,
} = api;
