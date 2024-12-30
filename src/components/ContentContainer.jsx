import React from 'react'

function ContentContainer({ children }) {
    return (
        <div className='md:h-[calc(100vh-4.5rem)] h-full pt-16 md:pt-0'>
            {children}
        </div>
    )
}

export default ContentContainer
