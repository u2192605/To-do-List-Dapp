import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../Types/Item";

export interface ItemStateType {
  input: ItemType;
}

const defaultWallet = localStorage.getItem("walletAddress") || "";
const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
const defaultUserID = storedUser?.user?._id || "";
const defaultAppId = 1;

const initialState: ItemStateType = {
  input: {
    name: "",
    taskDoerAddress: defaultWallet,
    rewardAmount: 1000000,
    categoryID: "",
    finished: false,
    userID: defaultUserID,
    appId: defaultAppId,
  },
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.input.name = action.payload;
    },
    setTaskDoerAddress: (state, action: PayloadAction<string>) => {
      state.input.taskDoerAddress = action.payload;
    },
    setRewardAmount: (state, action: PayloadAction<number>) => {
      state.input.rewardAmount = action.payload;
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.input.userID = action.payload;
    },
    setAppId: (state, action: PayloadAction<number>) => {
      state.input.appId = action.payload;
    },
  },
});

export const {
  setContent,
  setTaskDoerAddress,
  setRewardAmount,
  setUserID,
  setAppId,
} = itemSlice.actions;

export default itemSlice.reducer;
