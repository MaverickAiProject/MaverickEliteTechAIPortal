import React, { useEffect, useState } from 'react'
import GradientBox from '../components/GradientBox'
import { ADVANCED_TOOLS, AI_TOOLS } from '../utils/toolsTemplate'
import AiToolCard from '../components/AiToolCard'
import { useNavigate } from 'react-router-dom'
import ContentContainer from '../components/ContentContainer'

function AiTools() {

    const ALL_TOOLS_LIST = [...ADVANCED_TOOLS, ...AI_TOOLS]

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('')
    const [aiToolsList, setAiToolsList] = useState(ALL_TOOLS_LIST)

    useEffect(() => {
        if (searchInput.trim()) {
            const filteredList = ALL_TOOLS_LIST.filter((tool) =>
                tool.title.toLowerCase().includes(searchInput.toLowerCase())
            );
            setAiToolsList(filteredList);
        } else {
            setAiToolsList(AI_TOOLS);
        }
    }, [searchInput, AI_TOOLS]);

    const youtubeList = AI_TOOLS.filter(item => item.category === 'youtube')
    const instagramList = AI_TOOLS.filter(item => item.category === 'instagram')
    const blogList = AI_TOOLS.filter(item => item.category === 'blog')
    const linkedInList = AI_TOOLS.filter(item => item.category === 'linkedIn')

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
            <div className='flex flex-col mt-2 py-2 '>
                {!searchInput || searchInput.length == 0
                    ? <div>

                        <div className='rounded-lg mb-2 mt-1'>
                            <h1 className='font-bold text-center sm:text-left text-3xl mb-3 text-purpleText pl-2'>Advanced Tools</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {ADVANCED_TOOLS.map((tool, index) => (
                                    <div
                                        key={index}
                                        onClick={() => navigate('/' + tool.slug)}
                                        className="bg-whiteCard rounded-2xl p-4 transition-all ease-in-out duration-[0.25s] relative hover:shadow-lg hover:bottom-1 bottom-0 cursor-pointer"
                                    >
                                        <img src={tool.icon} alt={tool.title} className="w-full h-32 object-cover rounded-lg" />
                                        <h3 className="mt-4 text-lg font-semibold text-textColor">{tool.title}</h3>
                                        <p className="text-sm text-greyText mt-2">{tool.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='py-3 rounded-lg'>
                            <h1 className='font-bold text-center sm:text-left text-3xl mb-3 text-purpleText pl-1'>Youtube</h1>
                            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3'>
                                {youtubeList.map((tool, index) => (
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

                        <div className=' py-3 rounded-lg'>
                            <h1 className='font-bold text-center sm:text-left text-3xl mb-3 text-purpleText pl-1'>Instagram</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3'>
                                {instagramList.map((tool, index) => (
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

                        <div className='py-3 rounded-lg'>
                            <h1 className='font-bold text-center sm:text-left text-3xl mb-3 text-purpleText pl-1'>Blogs</h1>
                            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3'>
                                {blogList.map((tool, index) => (
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

                        <div className='py-3 rounded-lg'>
                            <h1 className='font-bold text-center sm:text-left text-3xl mb-3 text-purpleText pl-1'>LinkedIn</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3'>
                                {linkedInList.map((tool, index) => (
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
                    </div>

                    : <div className='grid grid-cols-2 text-center sm:text-left lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3'>
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
                }

            </div>
        </ContentContainer>
    )
}

export default AiTools
