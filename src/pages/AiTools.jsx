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
            <div className='p-5 flex flex-wrap gap-4 justify-center md:justify-start'>
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
