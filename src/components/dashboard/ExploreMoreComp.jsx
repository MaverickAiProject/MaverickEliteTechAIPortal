import React from 'react'
import { TOOLS_IMAGES } from '../../assets/images';
import GradientCard from './GradientCard';

function ExploreMoreComp() {
    const gradient = 'bg-gradient-to-r from-green-700 to-teal-800 '
    const link = 'ai-tools'
    const image = TOOLS_IMAGES.blog_content
    const heading = 'Explore all tools'

    return (
        <GradientCard
            gradient={gradient}
            link={link}
            image={image}
            heading={heading}
        />
    )
}

export default ExploreMoreComp