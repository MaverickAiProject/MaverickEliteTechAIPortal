import React from 'react'
import { TOOLS_IMAGES } from '../../assets/images';
import GradientCard from './GradientCard';

function ImageCompressComp() {

    const gradient = 'bg-gradient-to-r from-blue-700 to-purple-800'
    const link = 'image-compressor'
    const image = TOOLS_IMAGES.image_compressor
    const heading = 'Image Compressor'
    const otherText = 'Reduce size of images'

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

export default ImageCompressComp