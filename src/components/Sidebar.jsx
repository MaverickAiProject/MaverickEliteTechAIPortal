import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import CreditProgressBar from "./CreditsBalance";
import { NAV_MENUS } from "../utils/navMenus";
import { ThemeContext } from "../context/ThemeContext";
import { BsMoonStars } from "react-icons/bs";
import { LuSunMedium } from "react-icons/lu";

function Sidebar() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const navMenus = NAV_MENUS;

    const { navOpen, setNavOpen } = useContext(Context)
    const { credits, maxLimit } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className={`${navOpen ? "left-0" : "-left-full"} transition-all ease-in-out duration-500 fixed md:relative w-56
         bg-sidebarBg justify-between p-4 md:pt-5 flex flex-col z-50 top-0 bottom-0 right-0 md:left-0 pt-20 h-screen md:h-full`}>
            <nav className="mb-9 pt-4 md:pt-0">
                <ul className="space-y-2 h-full">
                    {navMenus.map((menu, index) => (
                        <li key={index}>
                            <NavLink
                                to={menu.link}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 w-[95%] mx-auto rounded-lg transition duration-300  ${isActive
                                        ? "bg-mainPurple text-activeText"
                                        : "text-textColor hover:bg-sidebarLinksHover"
                                    }`
                                }
                                onClick={() => setNavOpen(false)}
                            >
                                <span className="mr-2">{menu.icon}</span>
                                {menu.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-mainPurple text-activeText w-full rounded-lg p-2">
                    <h2 className="mb-1 text-xl"><strong>Credits</strong></h2>
                    <CreditProgressBar />
                    <p className=' text-xs mt-1 '>{`${credits}/${maxLimit} Credits Left`}</p>
                </div>
                <div className="bg-dashboardBg shadow-md text-greyText w-full text-center py-2 rounded-lg cursor-pointer" onClick={toggleDarkMode}>
                    {!darkMode
                        ? <p className="flex items-center justify-center gap-3"><span>Light Mode</span> <LuSunMedium /></p>
                        : <p className="flex items-center justify-center gap-3" ><span>Dark Mode</span> <BsMoonStars /></p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
