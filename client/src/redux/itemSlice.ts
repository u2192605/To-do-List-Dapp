import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../Types/Item";

export interface ItemStateType {
  input: ItemType;
}

const initialState: ItemStateType = {
  input: {
    content: "",
  },
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.input.content = action.payload;
    },
  },
});

export const { setContent } = itemSlice.actions;
export default itemSlice.reducer;
