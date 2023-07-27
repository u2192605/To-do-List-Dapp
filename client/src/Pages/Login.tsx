import { Form, Link } from "react-router-dom";

export const Login = () => {
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
        <input
          className="cursor-pointer w-full border-2 border-black rounded-md p-2
                hover:outline-teal-500 hover:border-teal-500
                focus:outline-teal-500 focus-within:border-teal-500
                hover:shadow-xl"
          type="submit"
          value={"Login"}
        />
        <div className="cursor-pointer w-full border-2 border-black rounded-md p-2
               hover:outline-teal-500 hover:border-teal-500
                focus:outline-teal-500 focus-within:border-teal-500
                hover:shadow-xl"
         >
          <Link to={"/signup"} className="flex w-full justify-center items-center">
            Signup
          </Link>
        </div>
      </Form>
    </div>
  );
};
