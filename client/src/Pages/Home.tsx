import { NavBar } from "../Components/NavBar";
import { Outlet } from "react-router-dom";

export const Component = () => {
    return (
        <div className="pt-16 justify-center items-center h-full">
            <NavBar/>
            <Outlet/>
        </div>
    )
}
