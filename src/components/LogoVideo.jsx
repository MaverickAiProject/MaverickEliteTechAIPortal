import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';

function LogoVideo() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <video
            src={`${!darkMode ? "/Maverick3.mp4" : "/Maverickblack.mp4"}`}
            autoPlay
            loop
            muted
            playsInline
            className="h-full"
        />
    )
}

export default LogoVideo