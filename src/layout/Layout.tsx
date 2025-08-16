import Header from "../pages/Header.tsx";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default Layout;