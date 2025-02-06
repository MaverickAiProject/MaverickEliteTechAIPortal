import React from 'react'
import { TOOLS_IMAGES } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

function ImageCompressComp() {
    const navigate = useNavigate();
    return (
        <div
            className='flex items-center p-8 gap-5 bg-gradient-to-r from-blue-700 to-purple-800 rounded-lg shadow-md cursor-pointer relative bottom-0 hover:bottom-1 ease-in-out transition-all duration-200 hover:shadow-lg'
            onClick={() => navigate('/image-compressor')}
        >
            <div>
                <img src={TOOLS_IMAGES.image_compressor} alt="text" className='h-20' />
            </div>
            <div className='flex flex-col justify-center gap-1'>
                <h2 className='text-3xl font-bold text-white'>Image Compressor</h2>
                <p className='text-gray-200'>Compress images to reduce file size</p>
            </div>

        </div>
    )
}

export default ImageCompressComp