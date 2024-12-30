import React, { useContext } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { images } from '../assets/images';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Context } from '../context/Context';

function Menubar() {

    const { setNavOpen, navOpen } = useContext(Context)

    const toggleNavbar = () => {
        setNavOpen((prev) => !prev); // Correctly toggling navOpen state
    };

    return (
        <div className='flex h-16 py-3 fixed z-[1000] md:static bg-white px-6 justify-between items-center w-full border-b shadow-sm'>
            <div onClick={toggleNavbar} className='md:hidden' >
                {navOpen
                    ? <ImCross size={30} className='md:hidden' />
                    : <GiHamburgerMenu size={30} className='md:hidden' />
                }
            </div>
            <img src={images.logo_purple_transparent} alt="" className='h-10' />
            <FaRegCircleUser size={30} />
        </div>
    )
}

export default Menubar
