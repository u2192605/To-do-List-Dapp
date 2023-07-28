import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CategoryType } from "../Types/Category";
import { TodoType } from "../Types/Todo";
import { AuthanticationResult } from "../Types/SignUpResult";
import { User } from "../Types/User";
import { RootState } from "./store";

type SearchType = {
  categories?: CategoryType[];
  todos?: TodoType[];
};

interface SignUpUser extends User {
  password: string,
}


interface GeneralRequest<T> {
  body: Partial<T>
}
interface AuthorizedRequest<T> extends GeneralRequest<T> {
  token: string,
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-do-list-server-qteg.onrender.com/ap/",
    prepareHeaders: (headers, { getState }) => {
      const auth = (getState() as RootState).auth
      if (auth) {
        headers.set(`authorization`, `Bearer ${auth.token}`)
      }
      return headers
    }
  }),
  tagTypes: ["Categories", "Todos", "Users"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => {
        return {
          url: `categories/`,
        }
      },
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
          method: 'POST',
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
      query: (categoryID) => {
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
    signUp: builder.mutation<AuthanticationResult, SignUpUser & Omit<SignUpUser, '_id'>>({
      query: (user) => {
        return {
          url: `users/signup/`,
          method: 'POST',
          body: user
        }
      },
    }),
    login: builder.mutation<AuthanticationResult,
      { name: string, password: string }>({
        query: (credentials) => {
          return {
            url: `users/login`,
            method: 'POST',
            body: credentials,
          }
        }
      })
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