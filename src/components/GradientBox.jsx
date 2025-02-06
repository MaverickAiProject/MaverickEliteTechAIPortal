import React from 'react'

function GradientBox({ children }) {
    return (
        <div className='gradient-background flex justify-center items-center text-white py-5 rounded-lg'>
            {children}
        </div>
    )
}

export default GradientBox
