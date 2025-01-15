import React, { useState } from 'react'
import ContentContainer from '../components/ContentContainer'
import GradientBox from '../components/GradientBox'
import GradientInnerTitle from '../components/GradientInnerTitle'
import aiImageGen from '../assets/tools images/ai image.png'
import aiSec from '../assets/ai-sec.jpg'
import pg from '/progress.gif'

function ImageGen() {
    console.log("API Key:", import.meta.env.VITE_HUGGING_FACE_IMAGE_GENERATION_API);

    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const query = async (data) => {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
                {
                    headers: {
                        Authorization: "Bearer " + import.meta.env.VITE_HUGGING_FACE_IMAGE_GENERATION_API,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }

            const result = await response.blob();
            return URL.createObjectURL(result);
        } catch (err) {
            setError(err.message);
            console.log(err)
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setImageUrl(null);

        const generatedImage = await query({
            inputs: prompt,
        });

        if (generatedImage) {
            setImageUrl(generatedImage);
        }

        setLoading(false);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "Maverick-generated-image.png";
        link.click();
    };


    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={aiImageGen}
                    title={'AI Image Generator'}
                    description={'Generate images using AI'}
                />
            </GradientBox>
            <div className="bg-[#e7effe] min-h-screen flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 md:gap-10 p-6">
                {/* Left Section */}
                <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-1/2">
                    {/* Beta Version Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl md:text-2xl text-center font-bold text-[#5f13c5] mb-4">
                            🚀 Welcome to the Beta Version of Our AI Image Generator!
                        </h2>
                        <p className="text-gray-600 text-sm text-justify">
                            Discover the power of AI to create stunning images from simple prompts.
                            As this is a beta version, feel free to explore and share your feedback!
                        </p>
                    </div>

                    {/* Input & Button Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5f13c5] focus:border-transparent mb-4"
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`w-full px-6 py-3 text-white font-medium rounded-lg shadow-md transition-colors ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#5f13c5] hover:bg-[#4a0fa3]"
                                }`}
                        >
                            {loading ? "Generating..." : "Generate"}
                        </button>
                        {error && <p className="mt-4 text-red-600">{error}</p>}
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        {!loading ?
                            <img
                                src={imageUrl || aiSec}
                                alt="Generated"
                                className="rounded-lg shadow-md w-full"
                            />
                            : <div className='w-full flex flex-col h-[calc(60vh-2rem)] justify-center items-center'>
                                <img
                                    src={imageUrl || pg}
                                    alt="Generated"
                                    className="rounded-lg w-full max-w-44"
                                />
                                <h3 className='font-semibold mb-1'>Generating image...</h3>
                                <p className='text-sm text-gray-500'>Don't refresh or close the page.</p>

                            </div>
                        }
                        {imageUrl && (
                            <button
                                onClick={handleDownload}
                                className="mt-4 w-full px-6 py-3 bg-[#5f13c5] text-white font-medium rounded-lg shadow-md hover:bg-[#4a0fa3] transition-colors"
                            >
                                Download
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </ContentContainer>
    )
}

export default ImageGen


