import React from 'react'

function GradientInnerTitle({ title, description, icon }) {
    return (
        <div className='flex gap-3 items-center justify-center'>
            <img src={icon} alt="" className='h-12 rounded shadow-sm' />
            <div>
                <h1 className='font-semibold text-3xl'>{title}</h1>
                <p className='text-base'>{description}</p>
            </div>
        </div>
    )
}

export default GradientInnerTitle
