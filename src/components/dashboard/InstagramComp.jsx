import React from 'react'
import { ANIMATED } from '../../assets/images'
import AiToolCard from '../AiToolCard';
import { AI_TOOLS } from '../../utils/toolsTemplate';
import { useNavigate } from 'react-router-dom';

function InstagramComp() {
    const YOUTUBE_TOOLS = AI_TOOLS.filter(item => item.category === 'instagram')
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-3 mt-3 transition-all ease-in-out duration-200 cursor-pointer rounded-lg'>
            <h2 className='text-2xl text-center sm:text-left font-bold text-purpleText'>🚀 Boost your <span className='text-pink-500'>Instagram</span>  Profile</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 mt-2 gap-3 '>
                {YOUTUBE_TOOLS.map((tool, index) => (
                    <AiToolCard
                        key={index}
                        cardImage={tool.icon}
                        cardTitle={tool.title}
                        cardText={tool.description}
                        handleOpenToolPage={() => {
                            navigate(`./ai-tools/${tool.slug}`);
                        }
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default InstagramComp