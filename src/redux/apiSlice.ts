import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType } from "../Types/Category";
import { TodoType } from "../Types/Todo";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Categories", "Todos"],
  endpoints: (  builder) => ({
    getCategories: builder.query({
      query: () => `categories/`,
      providesTags: ["Categories"],
    }),
    getCategoryByID: builder.query<CategoryType, string>({
      query: (ID) => `categories/${ID}?_embed=todos`,
      providesTags: ["Todos"],
    }),
    addCategory: builder.mutation<CategoryType, Partial<CategoryType>>({
      query: (body) => {
        return {
          url: "categories/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    addTodo: builder.mutation<TodoType, Partial<TodoType>>({
      query: (body)=>{
        return{
          url: "todos/",
          method: "POST",
          body, 
        }
      },
      invalidatesTags: ['Todos'],
    })
  }),
});

export const {
  useAddTodoMutation,
  useGetCategoriesQuery,
  useGetCategoryByIDQuery,
  useAddCategoryMutation,
} = api;
