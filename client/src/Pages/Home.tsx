import { SideBar } from "../Components/SideBar";
import { TopBar } from "../Components/TopBar";
import { Outlet } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <TopBar/>
            <SideBar />
            <Outlet/>
        </>
    )
}