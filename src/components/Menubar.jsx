import React, { useContext } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { images } from '../assets/images';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

function Menubar() {
    const navigate = useNavigate()
    const { setNavOpen, navOpen, userDetails } = useContext(Context)

    const toggleNavbar = () => {
        setNavOpen((prev) => !prev); // Correctly toggling navOpen state
    };

    const handleNav = () => {
        if (navOpen) {
            setNavOpen(false)
        }
    }

    return (
        <div className='flex h-16 py-3 fixed z-[1000] md:static bg-white px-6 justify-between items-center w-full border-b shadow-sm' onClick={handleNav}>
            <div onClick={toggleNavbar} className='md:hidden' >
                {navOpen
                    ? <ImCross size={30} className='md:hidden' />
                    : <GiHamburgerMenu size={30} className='md:hidden' />
                }
            </div>
            <img src={images.logo_purple_transparent} alt="" className='h-10' />
            <div className='flex gap-2 items-center cursor-pointer hover:text-primary transition-all duration-200' onClick={() => navigate('/settings')}>
                <p>{userDetails.name}</p>
                <FaRegCircleUser size={30} className='' />
            </div>
        </div>
    )
}

export default Menubar
