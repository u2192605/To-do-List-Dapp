import React from "react";
import { Outlet } from "react-router-dom";
import './Common.css'
import './SideBar.css'
import { Link } from "react-router-dom";

export const SideBar = () => {
    return (
        <>
            <nav className="side-bar">
                <h4>Todo App</h4>
                <form>
                    <input type="search" />
                </form>
                <Link to={'categories'} className="link">
                    <h5>
                        Categories
                    </h5>
                </Link>
                <Link to={''} className="link">
                    <h5>
                        Profile
                    </h5>
                </Link>
                <Link to={''} className="link">
                    <h5>
                        Settings
                    </h5>
                </Link>
            </nav>
            <Outlet />
        </>
    )
}