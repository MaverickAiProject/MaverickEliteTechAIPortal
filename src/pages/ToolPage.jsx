import React, { useContext, useEffect, useState } from 'react'
import GradientBox from '../components/GradientBox'
import { useParams } from 'react-router-dom'
import { AI_TOOLS } from '../utils/toolsTemplate'
import GradientInnerTitle from '../components/GradientInnerTitle'
import ContentContainer from '../components/ContentContainer'
import TextEditor from '../components/TextEditor'
import { Context } from '../context/Context'
import ReactLoading from 'react-loading';
import generateContent from '../services/generateContent'
import { toast } from 'react-hot-toast'

function ToolPage() {

    const [loading, setLoading] = useState(false);
    const [inputTopic, setInputTopic] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [aiPrompt, setAiPrompt] = useState("");
    const [result, setResult] = useState(null);

    const { toolSlug } = useParams()
    const tool = AI_TOOLS.find((tool) => tool.slug === toolSlug)

    if (!tool) {
        return <div>Tool not found</div>;
    }

    const { deductCredits } = useContext(Context)

    useEffect(() => {
        const aiPrompt = tool.aiPrompt
        setAiPrompt(aiPrompt)
    }, [tool])

    const handleGenerateContent = async () => {
        setLoading(true);

        try {
            const res = await generateContent({
                responseType: "text/plain",
                inputPrompt: `${aiPrompt} Topic: ${inputTopic}, Description: ${inputDescription} `
            });

            if (res) {
                setResult(res)
                deductCredits(50)
                setLoading(false);
            } else {
                toast.error("Error in generating content.")
            }

        } catch (error) {
            toast.error('Error in getting response', error)
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                />
            </GradientBox>
            <div className='p-5 flex-col sm:flex-row flex gap-4 sm:h-[calc(100vh-10.5rem)] items-start'>
                <div className='flex min-h-full md:w-auto w-full'>
                    <div className='flex flex-col gap-2 bg-whiteCard text-textColor p-5 rounded shadow-sm min-h-fit sm:min-h-full w-full'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="idea-heading" className='font-semibold'>What is your content Topic?</label>
                            <input
                                type="text"
                                id='idea-heading'
                                className='w-full bg-inputBg text-textColor p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purpleText focus:border-transparent mb-4'
                                placeholder='Type here...'
                                value={inputTopic}
                                onChange={(e) => setInputTopic(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col flex-grow gap-2'>
                            <label htmlFor="desc" className='font-semibold'>Give some description about your topic.</label>
                            <textarea
                                name="desc"
                                id="desc"
                                placeholder='Type Here...'
                                className='w-full bg-inputBg text-textColor p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purpleText focus:border-transparent mb-4 flex-grow resize-none'
                                value={inputDescription}
                                onChange={(e) => setInputDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button className='bg-mainPurple hover:bg-mainPurpleDark text-white rounded py-2 flex items-center justify-center min-h-8' onClick={handleGenerateContent}>
                            {loading ?
                                <ReactLoading type={"bars"} color={"white"} height={'30px'} width={'30px'} />
                                : 'Generate'
                            }
                        </button>
                    </div>
                </div>
                <div className=' md:flex-1 min-w-72 w-full pb-5 col-span-3 overflow-auto'>
                    <TextEditor text={result} />
                </div>
            </div>
        </ContentContainer>
    )
}

export default ToolPage
