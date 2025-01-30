import React, { useContext } from 'react'
import GradientBox from '../components/GradientBox'
import { AI_TOOLS } from '../utils/toolsTemplate'
import AiToolCard from '../components/AiToolCard'
import { useNavigate } from 'react-router-dom'
import ContentContainer from '../components/ContentContainer'

function AiTools() {
    const navigate = useNavigate();

    return (
        <ContentContainer>
            <GradientBox>
                <h1 className='font-semibold text-3xl'>AI Tools</h1>
            </GradientBox>
            <div className='sm:p-5 p-3  grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4'>
                {AI_TOOLS.map((tool, index) => (
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
        </ContentContainer>
    )
}

export default AiTools
