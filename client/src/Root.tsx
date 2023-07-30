import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { store } from "./redux/store";
import { api } from "./redux/apiSlice";
import { setCredentials } from "./redux/authSlice";

const logoutAction = async () => {
  // con
  localStorage.removeItem("user");
  await store.dispatch(
    setCredentials({
      user: { name: "", _id: "", gender: "", email: "" },
      token: "",
    })
  );
  store.dispatch(api.util.resetApiState());

  return redirect("/");
};

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./Pages/Home"),
    children: [
      {
        path: "",
        element: <Navigate to="categories" />,
      },
      {
        path: "categories/",
        lazy: () => import("./Pages/CategoryList"),
      },
      {
        path: "categories/:ID",
        lazy: () => import("./Pages/TodoList"),
      },
      {
        path: "login/",
        lazy: () => import("./Pages/Login"),
      },
      {
        path: "signup/",
        lazy: () => import("./Pages/SignUp"),
      },
      {
        path: "logout/",
        element: null,
        loader: logoutAction,
      },
    ],
  },
]);

export const Root = () => {
  return <RouterProvider router={router} />;
};
