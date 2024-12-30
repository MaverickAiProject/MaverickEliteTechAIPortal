import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuBar from "./Menubar";

const Layout = () => {

    return (
        <div className="flex h-screen flex-col">
            <MenuBar />
            <div className="flex relative h-screen w-screen">
                <Sidebar />
                <div className="flex-1 overflow-y-auto h-[calc(100%-0.5vh)] bg-dashboardBg dark:bg-dark-dashboardBg" onClick={() => console.log('click')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
