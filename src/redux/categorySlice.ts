import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "../Types/Category";

export interface CategoryState {
  categories: CategoryType[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoryType>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<CategoryType>) => {
      state.categories.splice(
        state.categories.findIndex(
          (category) => category.id === action.payload.id
        ),1);
    },
  },
});

export const {addCategory, removeCategory} = categorySlice.actions
export default categorySlice.reducer