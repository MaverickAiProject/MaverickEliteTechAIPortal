import React from "react";
import { FaHome } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { FiCpu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const NAV_MENUS = [
        {
            name: "Home",
            icon: <FaHome />,
            link: "/",
        },
        {
            name: "AI Tools",
            icon: <FiCpu />,
            link: "/ai-tools",
        },
        {
            name: "Billing",
            icon: <SiCashapp />,
            link: "/billing",
        },
        {
            name: "Settings",
            icon: <IoSettingsSharp />,
            link: "/settings",
        },
    ];

    const rangeValue = 60

    const navigate = useNavigate();

    return (
        <div className="w-56 bg-white dark:bg-dark-grayCard justify-between shadow-md p-4 mt-4 h-[calc(100vh-5rem)] flex flex-col">
            <nav>
                <ul className="space-y-2">
                    {NAV_MENUS.map((menu, index) => (
                        <li key={index}>
                            <NavLink
                                to={menu.link}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 w-[95%] mx-auto rounded-lg transition duration-300 ${isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-700 dark:text-dark-textPrimary hover:bg-gray-200 dark:hover:bg-dark-primary-light"
                                    }`
                                }
                            >
                                <span className="mr-2">{menu.icon}</span>
                                {menu.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-primary text-white w-full rounded-lg p-2">
                    <h2 className="-mb-2 text-xl"><strong>Credits</strong></h2>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={rangeValue}
                        readOnly
                        style={{ "--range-value": `${(rangeValue / 100) * 100}%` }}
                        className="w-full"
                    />
                    <p className="text-xs">630/1000 Credits Left</p>
                </div>
                <div className="bg-grayCard w-full text-center py-2 rounded-lg cursor-pointer" onClick={() => navigate('/billing')}>
                    <p className="text-primary">Buy more credits</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
