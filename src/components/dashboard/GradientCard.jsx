import React from 'react'
import { useNavigate } from 'react-router-dom';

function GradientCard({ gradient, link, image, otherText, heading }) {
    const navigate = useNavigate();

    return (
        <div
            className={`flex items-center px-3 py-5 sm:py-3 justify-center sm:h-36 gap-3 ${gradient} rounded-lg shadow-md cursor-pointer relative bottom-0 hover:bottom-1 ease-in-out transition-all duration-200 hover:shadow-lg`}
            onClick={() => navigate(`/${link}`)}
        >
            <div className='w-[20%] py-3'>
                <img src={image} alt="text" className='w-full sm:max-w-20 max-w-16' />
            </div>
            <div className='flex flex-col justify-center sm:gap-1'>
                <h2 className='xl:text-3xl md:text-2xl text-xl font-bold text-white'>{heading}</h2>
                <p className='text-gray-200'>{otherText}</p>
            </div>
        </div>
    )
}

export default GradientCard