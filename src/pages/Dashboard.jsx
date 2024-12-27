import React from 'react'
import GradientBox from '../components/GradientBox'
import { AI_TOOLS } from '../utils/toolsTemplate'
import AiToolCard from '../components/AiToolCard'
import { useNavigate } from 'react-router-dom'
import ContentContainer from '../components/ContentContainer'


function Dashboard() {

    const navigate = useNavigate();

    return (
        <ContentContainer>
            <GradientBox>
                <div className='flex flex-col items-center w-full'>
                    <h1 className='font-semibold text-3xl'>Explore All AI Tools by Maverick Elite Tech</h1>
                    <p className='mb-3 mt-1'>What would you like to create today?</p>
                    <input type="search" placeholder='Search' className='md:w-3/4 px-3 py-1 text-black rounded-md outline-none' />
                </div>
            </GradientBox>
            <div className='p-5 flex flex-wrap gap-4 '>
                {AI_TOOLS.map((tool, index) => (
                    <AiToolCard
                        key={index}
                        cardImage={tool.icon}
                        cardTitle={tool.title}
                        cardText={tool.description}
                        handleOpenToolPage={() => navigate(`/ai-tools/${tool.slug}`)}
                    />
                ))}
            </div>
        </ContentContainer>
    )
}

export default Dashboard
