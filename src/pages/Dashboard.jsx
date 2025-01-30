import React, { useEffect, useState } from 'react'
import GradientBox from '../components/GradientBox'
import { AI_TOOLS } from '../utils/toolsTemplate'
import AiToolCard from '../components/AiToolCard'
import { useNavigate } from 'react-router-dom'
import ContentContainer from '../components/ContentContainer'


function Dashboard() {

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('')
    const [aiToolsList, setAiToolsList] = useState(AI_TOOLS)

    useEffect(() => {
        if (searchInput.trim()) {
            const filteredList = AI_TOOLS.filter((tool) =>
                tool.title.toLowerCase().includes(searchInput.toLowerCase())
            );
            setAiToolsList(filteredList);
        } else {
            setAiToolsList(AI_TOOLS);
        }
    }, [searchInput, AI_TOOLS]);

    return (
        <ContentContainer>
            <GradientBox>
                <div className='flex flex-col items-center w-full px-2'>
                    <h1 className='font-semibold md:text-3xl text-2xl md:mb-0 mb-1 text-center md:w-full w-[80%]'>Explore All AI Tools by Maverick Elite Tech</h1>
                    <p className='mb-3 mt-1'>What would you like to create today?</p>
                    <input
                        type="search"
                        placeholder='Search'
                        className='md:w-3/4 w-[90%] px-3 py-1 text-black rounded-md outline-none'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </GradientBox>
            <div className='p-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4'>
                {aiToolsList.map((tool, index) => (
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
