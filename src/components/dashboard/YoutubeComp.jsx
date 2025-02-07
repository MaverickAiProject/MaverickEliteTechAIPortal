import React from 'react'
import { AI_TOOLS } from '../../utils/toolsTemplate'
import AiToolCard from '../AiToolCard';
import { ANIMATED } from '../../assets/images';
import { useNavigate } from 'react-router-dom'

function YoutubeComp() {
    const YOUTUBE_TOOLS = AI_TOOLS.filter(item => item.category === 'youtube')
    const navigate = useNavigate();

    return (
        <div className='px-2 pt-2 flex flex-col h-full'>
            <h2 className='text-center text-textColor text-2xl '>Grow your <span className='text-red-500 font-bold'> Youtube Channel</span></h2>
            <div className='grid grid-cols-2 gap-3 mt-5 flex-1 w-full'>
                {YOUTUBE_TOOLS.map((tool, index) => (
                    <AiToolCard
                        key={index}
                        classes={'justify-center'}
                        cardImage={tool.icon}
                        cardTitle={tool.smallTitle}
                        // cardText={tool.description}
                        handleOpenToolPage={() => {
                            navigate(`./ai-tools/${tool.slug}`);
                        }
                        }
                    />
                ))}
            </div>
            <div className='bg-whiteCard hover:shadow-lg transition-all ease-in-out duration-200 cursor-pointer rounded-lg mt-5 items-center flex px-8 sm:px-5 py-6 sm:py-5 justify-center gap-3 sm:gap-3 relative bottom-0 hover:bottom-1 border-mainPurple border flex-1 h-full'
                onClick={() => navigate('/youtube-video-generator')}
            >
                <img src={ANIMATED.video_camera} alt="animated" className='h-16 rounded-md' />
                <div>
                    <h2 className='xl:text-xl text-lg font-bold text-purpleText'>Generate Videos</h2>
                    <p className='text-greyText text-sm w-48'>Make youtube videos easily with the help of AI</p>
                </div>
            </div>
        </div>
    )
}

export default YoutubeComp