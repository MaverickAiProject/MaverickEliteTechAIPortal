import React from 'react'
import { TOOLS_IMAGES } from '../../assets/images';
import GradientCard from './GradientCard';

function TextToVoiceComp() {
    const gradient = 'bg-gradient-to-r from-pink-700 to-red-800'
    const link = 'text-to-voice'
    const image = TOOLS_IMAGES.voice
    const heading = 'Text to Voice'
    const otherText = 'Generate voices from text'

    return (
        <GradientCard
            gradient={gradient}
            link={link}
            image={image}
            heading={heading}
            otherText={otherText}
        />
    )
}

export default TextToVoiceComp