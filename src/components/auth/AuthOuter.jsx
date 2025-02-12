import React from 'react'
import { images } from '../../assets/images'

function AuthOuter({ children }) {
    return (
        <div className="flex items-center justify-center md:justify-between gap-[2vw] h-screen p-[4vw] ">
            <div className="h-full flex-1 hidden md:block">
                <img
                    src={images.loginImage}
                    alt="loginImage"
                    className="w-full h-full rounded-3xl object-cover"
                />
            </div>
            <div className='min-w-[40vw] flex justify-center'>
                {children}
            </div>
        </div>
    )
}

export default AuthOuter
