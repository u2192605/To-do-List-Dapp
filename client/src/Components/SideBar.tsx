import { Outlet } from "react-router-dom";
import './Common.css'
import './SideBar.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHome, faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { Search } from "./Search";

export const SideBar = () => {
    return (
        <>
            <div className="side-bar">
                <h4>Todo App</h4>
                <Search/>
                <nav className="nav-menu">
                    <Link to={'categories'} className="content-centered link">
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                    <Link to={''} className="content-centered link">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <Link to={''} className="content-centered link">
                        <FontAwesomeIcon icon={faGear} />
                    </Link>
                </nav>
            </div>
            <Outlet />
        </>
    )
}