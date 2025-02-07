import React from 'react'
import { images } from '../../assets/images'
import { useNavigate } from 'react-router-dom';

function ImageComp() {
    const navigate = useNavigate();

    return (
        <div
            className="h-full w-full bg-cover gap-2 flex flex-col justify-center px-7 py-6 sm:py-12 text-white bg-bottom rounded-lg"
            style={{ backgroundImage: `url(${images.fireworks})` }}
            onClick={() => navigate(`/image-gen`)}
        >
            <h1 className='text-2xl sm:text-4xl font-bold'>Generate Images using AI</h1>
            <p className='text-gray-300'>Experience the super powers of AI and generate images as you want.</p>
            <button className="bg-mainPurple mt-4 hover:bg-mainPurpleDark w-fit text-white px-4 py-2 rounded">Get started</button>
        </div>
    )
}

export default ImageComp