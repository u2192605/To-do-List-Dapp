import { Form, Link } from "react-router-dom";
export const SignUp = () => {
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
            hover:shadow-xl
            "
            type="text"
            placeholder="First Name"
            name="firstName"
            required={true}
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
            required={true}
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
          required={true}
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
          required={true}
        />
        {/* <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
        /> */}
        <div className="text-base">Gender</div>
        <div className="flex space-x-4 justify-start w-full">
          <div className="flex space-x-2">
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              required={true}
            />
            <label htmlFor="male">male</label>
          </div>
          <div className="flex space-x-2">
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              required={true}
            />
            <label htmlFor="female">female</label>
          </div>
        </div>

        <input
          className="cursor-pointer rounded-md border-2 border-black p-2 w-full
            hover:outline-teal-500 hover:border-teal-500
            focus:outline-teal-500 focus-within:border-teal-500
            hover:shadow-xl"
          type="submit"
          value="Signup"
        />
        <button
          className="rounded-md border-2 border-black p-2 w-full
            hover:outline-teal-500 hover:border-teal-500
            focus:outline-teal-500 focus-within:border-teal-500
            hover:shadow-xl"
        >
          <Link to={"/login"}>Login</Link>
        </button>
      </Form>
    </div>
  );
};
