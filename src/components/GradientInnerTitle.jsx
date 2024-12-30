import React from 'react'

function GradientInnerTitle({ title, description, icon }) {
    return (
        <div className='flex gap-3 items-center justify-center md:px-2 px-4'>
            <img src={icon} alt="" className='h-12 rounded shadow-sm' />
            <div className='md:w-full w-[80%]'>
                <h1 className='font-semibold md:text-3xl text-base md:mb-0 mb-1'>{title}</h1>
                <p className='md:text-base text-xs'>{description}</p>
            </div>
        </div>
    )
}

export default GradientInnerTitle
