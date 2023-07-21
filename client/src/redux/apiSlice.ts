import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType } from "../Types/Category";
import { TodoType } from "../Types/Todo";

type SearchType = {
  categories?: CategoryType[];
  todos?: TodoType[];
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Categories", "Todos"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => `categories/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Categories" as const, id: _id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    addCategory: builder.mutation<CategoryType, Partial<CategoryType>>({
      query: (body) => {
        return {
          url: "categories/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    removeCategory: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => {
        return {
          url: `categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [
        { type: "Categories", id: "LIST" },
        { type: "Todos", id: "LIST" },
      ],
    }),

    getTodosByCategoryID: builder.query<TodoType[], string>({
      query: (categoryID)=>{
        return {
          url: `todos/${categoryID}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Todos" as const, id: _id })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),

    addTodo: builder.mutation<TodoType, Partial<TodoType>>({
      query: (body) => {
        return {
          url: "todos/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    removeTodo: builder.mutation<{ success: Boolean; id: string }, string>({
      query: (id) => {
        return {
          url: `todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<
      TodoType,
      Partial<TodoType> & Pick<TodoType, "_id">
    >({
      query: ({ _id, ...patch }) => {
        return {
          url: `todos/${_id}`,
          method: "PATCH",
          body: patch,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Todos", id: arg._id }]
      }
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
  useGetTodosByCategoryIDQuery
} = api;
