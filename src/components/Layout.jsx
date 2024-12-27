import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuBar from "./MenuBar";

const Layout = () => {
    return (
        <div className="flex h-screen flex-col">
            <MenuBar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 overflow-y-auto bg-dashboardBg dark:bg-dark-dashboardBg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
