import React from 'react'

function ContentContainer({ children }) {
    return (
        <div className='h-[calc(100vh-5rem)]'>
            {children}
        </div>
    )
}

export default ContentContainer
