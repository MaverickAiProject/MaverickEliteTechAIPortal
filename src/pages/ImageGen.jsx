import React, { useState } from 'react'
import ContentContainer from '../components/ContentContainer'
import GradientBox from '../components/GradientBox'
import GradientInnerTitle from '../components/GradientInnerTitle'
import aiImageGen from '../assets/tools images/ai image.png'

function ImageGen() {

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
                        Authorization: "Bearer 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",
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
        link.download = "generated-image.png";
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
            <div className="flex flex-col items-center justify-center py-10">
                <h2 className="text-2xl font-bold text-[#5f13c5] mb-6">
                    🚀 Welcome to the Beta Version of Our AI Image Generator!
                </h2>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                    Experience the magic of AI by generating stunning images from your prompts.
                    This is a beta release, so feel free to explore and let your creativity flow!
                </p>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    className="w-80 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#5f13c5] focus:border-transparent mb-4"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className={`px-6 py-3 text-white font-medium rounded-lg shadow-md transition-colors ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#5f13c5] hover:bg-[#4a0fa3]"
                        }`}
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
                {imageUrl && (
                    <div className="mt-6 text-center">
                        <img
                            src={imageUrl}
                            alt="Generated"
                            className="max-w-full rounded-lg shadow-md border border-gray-200"
                        />
                        <button
                            onClick={handleDownload}
                            className="mt-4 px-6 py-2 bg-[#5f13c5] text-white font-medium rounded-lg shadow-md hover:bg-[#4a0fa3] transition-colors"
                        >
                            Download
                        </button>
                    </div>
                )}
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
        </ContentContainer>
    )
}

export default ImageGen