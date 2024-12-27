import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { images } from '../assets/images';

function Menubar() {
    return (
        <div className='flex h-16 py-3 px-6 justify-between items-center w-full border-b shadow-sm'>
            <img src={images.logo_purple_transparent} alt="" className='h-10' />
            <FaRegCircleUser size={30} />
        </div>
    )
}

export default Menubar
