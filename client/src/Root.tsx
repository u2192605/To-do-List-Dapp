import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { store } from "./redux/store";
import { TodoList } from "./Pages/TodoList";
import { api } from "./redux/apiSlice";
import { CategoryList } from "./Pages/CategoryList";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { setCredentials } from "./redux/authSlice";
import { User } from "./Types/User";

const categoriesLoader = async () => {
  const token = store.getState().auth.token;
  if (!token) {
    throw redirect("/login");
  }
  const p = store.dispatch(api.endpoints.getCategories.initiate());
  try {
    const response = await p.unwrap();
    return response;
  } catch (error) {
    return error;
  } finally {
    p.unsubscribe();
  }
};

const signleCategoryLoader = async ({ params }: any) => {
  const token = store.getState().auth.token;
  if (!token) {
    throw redirect("/login");
  }
  const p = store.dispatch(
    api.endpoints.getTodosByCategoryID.initiate(params.ID ?? "")
  );
  try {
    const response = await p.unwrap();
    return response;
  } catch (error) {
    return error;
  } finally {
    p.unsubscribe();
  }
};

const loginAction = async ({ request, params }: any) => {
  switch (request.method) {
    case "POST":
      const d = Object.fromEntries(await request.formData());
      const user = {
        email: d.email,
        password: d.password,
      } as any;
      const p = store.dispatch(api.endpoints.login.initiate(user));
      try {
        const response = await p.unwrap();
        const r_user = {
          name: response.name as string,
          _id: response._id as string,
          email: response.email as string,
          gender: response.gender as string,
        } as User;
        const token = response.token as string;
        await store.dispatch(setCredentials({ user: r_user, token }));
        localStorage.setItem("user", JSON.stringify({ user: r_user, token }));
        return redirect("/categories");
      } catch (error: any) {
        return error;
      }
  }
};

const signupAction = async ({ request, params }: any) => {
  switch (request.method) {
    case "POST":
      const d = Object.fromEntries(await request.formData());
      const user = {
        name: `${d.firstName} ${d.lastName}`,
        password: d.password,
        gender: d.gender,
        email: d.email,
      } as any;
      const p = store.dispatch(api.endpoints.signUp.initiate(user));
      try {
        const response = await p.unwrap();
        const r_user = {
          name: response.name as string,
          _id: response._id as string,
          email: response.email as string,
          gender: response.gender as string,
        } as User;
        const token = response.token as string;
        await store.dispatch(setCredentials({ user: r_user, token }));
        localStorage.setItem("user", JSON.stringify(response));
        return redirect("/login");
      } catch (error: any) {
        return error;
      }
  }
};

const loginLoader = () => {
  const token = store.getState().auth.token;
  if (token) throw redirect("/categories");
  return null;
};
const signUpLoader = loginLoader;

const homeLoader = () => {
  const token = store.getState().auth.token
  if(token) throw redirect("/categories")
  else throw redirect("/login")
};

const logoutAction = async () => {
  console.log('e')
  // con
  localStorage.removeItem("user");
  await store.dispatch(
    setCredentials({
      user: { name: "", _id: "", gender: "", email: "" },
      token: "",
    })
  );
  return redirect("/")
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: homeLoader,
    children: [
      {
        path: '',
        element: <Navigate to="categories"/>
      },
      {
        path: "categories/",
        element: <CategoryList />,
        loader: categoriesLoader,
      },
      {
        path: "categories/:ID",
        element: <TodoList />,
        loader: signleCategoryLoader,
      },
      {
        path: "login/",
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "signup/",
        element: <SignUp />,
        loader: signUpLoader,
        action: signupAction,
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
