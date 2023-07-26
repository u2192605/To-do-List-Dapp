import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/TopBar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const TopBar = () => {
  const  token  = useSelector((state: RootState) => state.auth.token);
  return (
    <header className={styles.topBarContainer}>
      <h1>Todo List</h1>
      <div className={styles.leftPart}>
        {token? (
          <div className={styles.btn}>
            <Link to={"/logout"}>Logout</Link>
          </div>
        ) : (
          <>
            <button className={styles.btn}>
              <Link to={"/signup"}>Signup</Link>
            </button>
            <button className={styles.btn}>
              <Link to={"/login"}>Login</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
