import React, { useContext } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { BsMoonStars } from "react-icons/bs";
import { LuSunMedium } from "react-icons/lu";
import LogoVideo from './LogoVideo';
import { useAuth } from '../context/AuthContext';

function Menubar() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate()
    const { setNavOpen, navOpen } = useContext(Context)
    const { userDetails } = useAuth()

    const toggleNavbar = () => {
        setNavOpen((prev) => !prev); // Correctly toggling navOpen state
    };

    const handleNav = () => {
        if (navOpen) {
            setNavOpen(false)
        }
    }

    return (
        <div
            className='flex md:hidden h-16 py-2  fixed z-[1000] md:static bg-navbarBg text-textColor px-6 justify-between items-center w-full shadow-md  ease-in-out transform duration-300'
            onClick={handleNav}
        >
            <div onClick={toggleNavbar} className='md:hidden' >
                {navOpen
                    ? <ImCross size={30} className='md:hidden' />
                    : <GiHamburgerMenu size={30} className='md:hidden' />
                }
            </div>
            {/* <img src={images.logo_purple_transparent} alt="" className='h-10' /> */}
            <div className='h-full p-0'>
                <LogoVideo />
            </div>

            <div className='flex gap-6 items-center justify-center'>

                <div
                    className='hidden md:flex flex-row-reverse gap-2 items-center cursor-pointer hover:text-purpleText transition-all duration-200'
                    onClick={() => navigate('/settings')}
                >

                    <p className=''>{userDetails.name}</p>
                    <FaRegCircleUser size={25} className='' />
                </div>

                <div className="cursor-pointer text-xl transition-all duration-300 ease-in-out" onClick={toggleDarkMode}>
                    {darkMode
                        ? <BsMoonStars size={25} className='hover:text-yellow-300 hover:scale-110 transition-all duration-200 ease-in-out' />
                        : <LuSunMedium size={25} className=' hover:scale-125 transition-all duration-200 ease-in-out' />
                    }
                </div>
            </div>

        </div>
    )
}

export default Menubar
