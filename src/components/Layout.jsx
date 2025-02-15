import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuBar from "./Menubar";
import { Context } from "../context/Context";

const Layout = () => {
    const { setNavOpen, navOpen } = useContext(Context)

    function handleNavOpenClose() {
        if (navOpen) {
            setNavOpen(false)
        }
    }

    return (
        <div className={`flex h-screen flex-col overflow-x-hidden ${navOpen ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
            <MenuBar />
            <div className="flex flex-1 relative w-screen">
                <Sidebar />
                <div className={`flex-1 p-3 sm:p-5 pt-4 sm:pt-3 bg-dashboardMainBg transition-all ease-in-out duration-300 ${!navOpen ? 'overflow-y-auto' : 'overflow-hidden'}`} onClick={handleNavOpenClose}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;

//h-[calc(100%-0.5vh)]