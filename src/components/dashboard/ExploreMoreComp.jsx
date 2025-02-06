import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TOOLS_IMAGES } from '../../assets/images';

function ExploreMoreComp() {
    const navigate = useNavigate();

    return (
        <div
            className='flex items-center p-8 gap-5 bg-gradient-to-r from-green-700 to-teal-800 rounded-lg shadow-md cursor-pointer relative bottom-0 hover:bottom-1 ease-in-out transition-all duration-200 hover:shadow-lg'
            onClick={() => navigate('/ai-tools')}
        >
            <div>
                <img src={TOOLS_IMAGES.blog_content} alt="text" className='h-20' />
            </div>
            <div className='flex flex-col justify-center gap-1'>
                <h2 className='text-3xl font-bold text-white'>Explore all tools</h2>
            </div>
        </div>
    )
}

export default ExploreMoreComp