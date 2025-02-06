import React from 'react'
import { AI_TOOLS } from '../../utils/toolsTemplate'
import AiToolCard from '../AiToolCard';
import { ANIMATED } from '../../assets/images';
import { useNavigate } from 'react-router-dom'

function YoutubeComp() {
    const YOUTUBE_TOOLS = AI_TOOLS.filter(item => item.category === 'youtube')
    const navigate = useNavigate();

    return (
        <div className='px-2 pt-2 flex flex-col'>
            <h2 className='text-center text-textColor text-2xl '>Grow your <span className='text-red-500 font-bold'> Youtube Channel</span></h2>
            <div className='grid grid-cols-2 gap-3 mt-3 flex-1 w-full'>
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
            <div className='bg-whiteCard hover:shadow-lg transition-all ease-in-out duration-200 cursor-pointer rounded-lg mt-3 h-32 items-center flex p-3 justify-center gap-5 relative bottom-0 hover:bottom-1 border-mainPurple border flex-1'
                onClick={() => navigate('/youtube-video-generator')}
            >
                <img src={ANIMATED.video_camera} alt="animated" className='h-16 rounded-md' />
                <div>
                    <h2 className='text-2xl font-bold text-purpleText'>Generate Youtube Videos</h2>
                    <p className='text-greyText'>Make youtube videos easily with the help of AI</p>
                </div>
            </div>
        </div>
    )
}

export default YoutubeComp