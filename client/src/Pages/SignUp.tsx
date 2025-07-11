import { Form, Link, redirect } from "react-router-dom";
import { api, useSignUpMutation } from "../redux/apiSlice";
import { Spinner } from "../Components/Spinner";
import { store } from "../redux/store";
import { setCredentials } from "../redux/authSlice";
import { User } from "../Types/User";

export const Component = () => {
  const [, signupResult] = useSignUpMutation();

  return (
    <div className="flex flex-col justify-start items-center w-auto h-auto mx-auto max-w-md">
      <div className="text-2xl mt-2 mb-2">Signup</div>
      <Form
        className="flex flex-col space-y-6 justify-center items-start rounded-md border-2
         border-black p-4 mx-auto"
        method="POST"
        action="/signup"
      >
        <div className="flex space-x-2 mx-auto justify-evenly">
          <input
            className="rounded-md border-2 border-black p-2 w-1/2
            hover:outline-teal-500 hover:border-teal-500
            focus:outline-teal-500 focus-within:border-teal-500
            hover:shadow-xl"
            type="text"
            placeholder="First Name"
            name="firstName"
            required
            pattern="[a-zA-Z]+"
          />
          <input
            className="rounded-md border-2 border-black p-2 w-1/2
            hover:outline-teal-500 hover:border-teal-500
            focus:outline-teal-500 focus-within:border-teal-500
            hover:shadow-xl"
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
            pattern="[a-zA-Z]+"
          />
        </div>
        <input
          className="rounded-md border-2 border-black p-2 w-full
          hover:outline-teal-500 hover:border-teal-500
          focus:outline-teal-500 focus-within:border-teal-500
          hover:shadow-xl"
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className="rounded-md border-2 border-black p-2 w-full
          hover:outline-teal-500 hover:border-teal-500
          focus:outline-teal-500 focus-within:border-teal-500
          hover:shadow-xl"
          type="password"
          placeholder="Password"
          name="password"
          pattern={"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"}
          required
        />
        <div className="text-base">Gender</div>
        <div className="flex space-x-4 justify-start w-full">
          <div className="flex space-x-2">
            <input type="radio" name="gender" value="male" id="male" required />
            <label htmlFor="male">male</label>
          </div>
          <div className="flex space-x-2">
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              required
            />
            <label htmlFor="female">female</label>
          </div>
        </div>

        <button
          className="cursor-pointer rounded-md border-2 border-black p-2 w-full
          hover:outline-teal-500 hover:border-teal-500
          focus:outline-teal-500 focus-within:border-teal-500
          hover:shadow-xl"
        >
          {signupResult.isLoading ? <Spinner length={4} /> : "Signup"}
        </button>

        <div
          className="cursor-pointer w-full border-2 border-black rounded-md p-2
         hover:outline-teal-500 hover:border-teal-500
         focus:outline-teal-500 focus-within:border-teal-500
         hover:shadow-xl"
        >
          <Link
            to={"/login"}
            className="flex w-full justify-center items-center"
          >
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export const loader = () => {
  const token = store.getState().auth.token;
  if (token) throw redirect("/categories");
  return null;
};

export const action = async ({ request }: any) => {
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
          walletAddress: response.walletAddress as string,
          walletMnemonic: response.walletMnemonic as string,
        } as User;

        const token = response.token as string;
        localStorage.setItem("token", token);

        await store.dispatch(setCredentials({ user: r_user, token }));

        // Save full user info in localStorage
        localStorage.setItem("user", JSON.stringify(response));

        // Save wallet info separately for easier access
        localStorage.setItem("walletAddress", response.walletAddress);
        localStorage.setItem("walletMnemonic", response.walletMnemonic);

        return redirect("/login");
      } catch (error: any) {
        return error;
      }
  }
};
