import React from 'react'
import { TOOLS_IMAGES } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

function TextToVoiceComp() {
    const navigate = useNavigate();


    return (
        <div
            className='flex items-center p-8 gap-3 bg-gradient-to-r from-pink-700 to-red-800 rounded-lg shadow-md cursor-pointer relative bottom-0 hover:bottom-1 ease-in-out transition-all duration-200 hover:shadow-lg'
            onClick={() => navigate('/text-to-voice')}
        >
            <div>
                <img src={TOOLS_IMAGES.voice} alt="text" className='h-20' />
            </div>
            <div className='flex flex-col justify-center gap-1'>
                <h2 className='text-3xl font-bold text-white'>Text to Voice</h2>
                <p className='text-gray-200'>Compress images to reduce file size</p>
            </div>
        </div>
    )
}

export default TextToVoiceComp