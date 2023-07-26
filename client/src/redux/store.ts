import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice";
import { api } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    api: api.reducer,
    item: itemReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
