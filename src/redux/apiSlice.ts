import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType } from "../Types/Category";
import { TodoType } from "../Types/Todo";

type SearchType = {
  categories?: CategoryType[];
  todos?: TodoType[];
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Categories", "Todos"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => `categories/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories" as const, id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getCategoryByID: builder.query<CategoryType, string>({
      query: (ID) => `categories/${ID}?_embed=todos`,
      providesTags: (result) =>
        result
          ? [
              ...result.todos.map(({ id }) => ({ type: "Todos" as const, id })),
              { type: "Todos", id: "LIST" },
              { type: "Categories", id: result.id },
            ]
          : [{ type: "Todos", id: "List" }],
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
      Partial<TodoType> & Pick<TodoType, "id">
    >({
      query: ({ id, ...patch }) => {
        return {
          url: `todos/${id}`,
          method: "PATCH",
          body: patch,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),
  }),
});

export const {
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useRemoveCategoryMutation,
  useAddTodoMutation,
  useGetCategoriesQuery,
  useGetCategoryByIDQuery,
  useAddCategoryMutation,
} = api;
