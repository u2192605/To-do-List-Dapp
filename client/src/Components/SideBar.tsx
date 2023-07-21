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
                    <Link to={'categories'} className="content-to-start link">
                        <FontAwesomeIcon icon={faHome} className="margin-2"/>
                        Home
                    </Link>
                    <Link to={''} className="content-to-start link">
                        <FontAwesomeIcon icon={faUser} className="margin-2"/>
                        Profile
                    </Link>
                    <Link to={''} className="content-to-start link">
                        <FontAwesomeIcon icon={faGear} className="margin-2"/>
                        Setting
                    </Link>
                </nav>
            </div>
            <Outlet />
        </>
    )
}