import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <header
      className="fixed top-0 left-0 flex justify-between align-middle
      h-auto w-full mx-auto p-4 bg-white shadow transition
      hover:shadow-lg"
    >
      <div className="text-2xl font-bold text-teal-500">
        <Link to={"/categories"}>Todo List</Link>
      </div>
      <div className="flex space-x-4">
        {token ? (
          <>
            {/* <div className="text-lg hover:text-teal-500">
              <Link to={"/profile"} >
                <FontAwesomeIcon icon={faUser}/>
              </Link>
            </div> */}
            <div className="text-lg hover:text-teal-500">
              <Link to={"/logout"} className="">
                Logout
              </Link>
            </div>
          </>
        ) : (
          <>
            <button className="text-lg hover:text-teal-500">
              <Link to={"/signup"}>Signup</Link>
            </button>

            <button className="text-lg hover:text-teal-500">
              <Link to={"/login"}>Login</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
