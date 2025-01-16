import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { FiCpu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import CreditProgressBar from "./CreditsBalance";
import { MdPolicy } from "react-icons/md";
import { RiImageCircleAiFill } from "react-icons/ri";
import { FaCompressArrowsAlt } from "react-icons/fa";

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
            name: "AI Images",
            icon: <RiImageCircleAiFill />,
            link: "/image-gen",
        },
        {
            name: "Image Compress",
            icon: <FaCompressArrowsAlt />,
            link: "/image-compressor",
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
        {
            name: "Our Policies",
            icon: <MdPolicy />,
            link: "/PolicyPage",
        },
    ];

    const { navOpen, setNavOpen } = useContext(Context)
    const { credits, maxLimit } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className={`${navOpen ? "left-0" : "-left-full"} transition-all duration-500 absolute md:relative h-full w-56 md:w-56 bg-white dark:bg-dark-grayCard justify-between shadow-md p-4 md:mt-4 md:h-[calc(100vh-5rem)] flex flex-col z-50 top-0 bottom-0 right-0 md:left-0 md:pt-1 pt-20`}>
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
                <div className="bg-primary text-white w-full rounded-lg p-2">
                    <h2 className="mb-1 text-xl"><strong>Credits</strong></h2>
                    <CreditProgressBar />
                    <p className=' text-xs mt-1 '>{`${credits}/${maxLimit} Credits Left`}</p>
                </div>
                <div className="bg-grayCard w-full text-center py-2 rounded-lg cursor-pointer" onClick={() => { navigate('/billing'); setNavOpen(false) }}>
                    <p className="text-primary">Buy more credits</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
