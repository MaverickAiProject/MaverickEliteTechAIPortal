import React, { useContext } from 'react'
import GradientBox from '../components/GradientBox'
import { AI_TOOLS } from '../utils/toolsTemplate'
import AiToolCard from '../components/AiToolCard'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

function AiTools() {
    const navigate = useNavigate();
    const { setResult } = useContext(Context);

    return (
        <div className='h-[calc(100vh-5rem)]'>
            <GradientBox>
                <h1 className='font-semibold text-3xl'>AI Tools</h1>
            </GradientBox>
            <div className='p-5 flex flex-wrap gap-4 '>
                {AI_TOOLS.map((tool, index) => (
                    <AiToolCard
                        key={index}
                        cardImage={tool.icon}
                        cardTitle={tool.title}
                        cardText={tool.description}
                        handleOpenToolPage={() => {
                            navigate(`./${tool.slug}`);
                            setResult('')
                        }
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default AiTools
