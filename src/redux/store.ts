import { configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import todoReducer from './todoSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    todo:  todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
