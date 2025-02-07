import React, { useEffect, useState } from 'react'
import GradientBox from '../components/GradientBox'
import { AI_TOOLS } from '../utils/toolsTemplate'
import AiToolCard from '../components/AiToolCard'
import { useNavigate } from 'react-router-dom'
import ContentContainer from '../components/ContentContainer'

function AiTools() {
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
                <div className='flex flex-col items-center text-center justify-center w-full px-2'>
                    <h1 className='font-semibold text-3xl sm:mb-0 mb-2'>Start your journey with our Advanced AI Tools</h1>
                    <p className='mb-5 mt-1'>What would you like to create today?</p>
                    <input
                        type="search"
                        placeholder='Search'
                        className='md:w-3/4 w-[90%] px-3 py-1 text-black rounded-md outline-none'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </GradientBox>
            <div>
                <div className='py-3 mt-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3'>
                    {aiToolsList.map((tool, index) => (
                        <AiToolCard
                            key={index}
                            cardImage={tool.icon}
                            cardTitle={tool.title}
                            cardText={tool.description}
                            handleOpenToolPage={() => {
                                navigate(`./${tool.slug}`);
                            }
                            }
                        />
                    ))}
                </div>
            </div>
        </ContentContainer>
    )
}

export default AiTools
