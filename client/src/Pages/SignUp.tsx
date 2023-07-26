import { Form, Link } from "react-router-dom";
import styles from "./styles/SignUp.module.css";
import { useSignUpMutation } from "../redux/apiSlice";

export const SignUp = () => {
  const [signup, result] = useSignUpMutation();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data =  new FormData(event.target as  HTMLFormElement)
    console.log(data);
  };

  return (
    <div className={styles.formContainer}>
      <h3>SignUp</h3>
      <Form className={styles.form}  method='POST' action='/signup'>
        <div>
          <input
            type="text"
            placeholder="first name"
            name="firstName"
            required={true}
            pattern="[a-zA-Z]+"
          />
          <input
            type="text"
            placeholder="last name"
            name="lastName"
            required={true}
            pattern="[a-zA-Z]+"
          />
        </div>
        <input type="email" placeholder="Email" name="email" 
        required={true} 
        />
        <input
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
        <label>Gender</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            required={true}
          />
          <label htmlFor="male">male</label>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            required={true}
          />
          <label htmlFor="male">female</label>
        </div>

        <input type="submit" value="Signup" />
        <div>
          <Link to={'/login'}>Login</Link>
        </div>
      </Form>
    </div>
  );
};
