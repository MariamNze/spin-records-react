import Header from "../pages/A_header/Header.tsx";
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