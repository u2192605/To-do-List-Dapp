import { Form, Link, redirect } from "react-router-dom";
import { api, useLoginMutation } from "../redux/apiSlice";
import { Spinner } from "../Components/Spinner";
import { store } from "../redux/store";
import { User } from "../Types/User";
import { setCredentials } from "../redux/authSlice";

export const Component = () => {
  const [, loginResult] = useLoginMutation();

  return (
    <div
      className="flex flex-col justify-start items-center w-auto h-auto max-w-md
        mx-auto"
    >
      <div className="text-2xl mt-2 mb-2">Login</div>
      <Form
        className="flex flex-col border-2 border-black rounded-md justify-start items-start
            space-y-6 w-full p-4"
        action="/login"
        method="POST"
      >
        <input
          type="email"
          className="w-full border-2 border-black rounded-md p-2
                hover:outline-teal-500 hover:border-teal-500
                focus:outline-teal-500 focus-within:border-teal-500
                hover:shadow-xl"
          name="email"
          placeholder="Email"
        />
        <input
          className="w-full border-2 border-black rounded-md p-2 
                hover:outline-teal-500 hover:border-teal-500
                focus:outline-teal-500 focus-within:border-teal-500
                hover:shadow-xl"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="cursor-pointer w-full border-2 border-black rounded-md p-2
                hover:outline-teal-500 hover:border-teal-500
                focus:outline-teal-500 focus-within:border-teal-500
                hover:shadow-xl"
        >
          {loginResult.isLoading ? <Spinner length={4} /> : "Login"}
        </button>
        <div
          className="cursor-pointer w-full border-2 border-black rounded-md p-2
               hover:outline-teal-500 hover:border-teal-500
                focus:outline-teal-500 focus-within:border-teal-500
                hover:shadow-xl"
        >
          <Link
            to={"/signup"}
            className="flex w-full justify-center items-center"
          >
            Signup
          </Link>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request, params }: any) => {
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

export const loader = () => {
  const token = store.getState().auth.token;
  if (token) throw redirect("/categories");
  return null;
};
