import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuBar from "./Menubar";

const Layout = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className="flex h-screen flex-col">
            <MenuBar setOpen={setOpen} open={open} />
            <div className="flex relative h-screen w-screen">
                <Sidebar open={open} />
                <div className="flex-1 overflow-y-auto h-[calc(100%-0.5vh)] bg-dashboardBg dark:bg-dark-dashboardBg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
