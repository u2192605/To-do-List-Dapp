import React from "react";
import { Outlet } from "react-router-dom";
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
                <ul style={{ listStyle: 'none' }}>
                    <li>
                        <Link to={'categories'}>Categories</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}