import { configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import todoReducer from './todoSlice'
import itemReducer from './itemSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    todo:  todoReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;