import React, { useContext, useEffect, useState } from 'react'
import ContentContainer from '../components/ContentContainer'
import GradientBox from '../components/GradientBox'
import GradientInnerTitle from '../components/GradientInnerTitle'
import { images, LOADING_GIFS, TOOLS_IMAGES } from '../assets/images'
import { Context } from '../context/Context'
import toast from 'react-hot-toast';
import { imageGenerator } from '../services/imageGenerator'
import { IMAGE_MODELS } from '../utils/aiModel'
import { handleDownloadImage } from '../services/downloadImage'

function ImageGen() {

    const { deductCredits } = useContext(Context)
    const [prompt, setPrompt] = useState("");
    const [imageModel, setImageModel] = useState(IMAGE_MODELS[0].model)
    const [imageUrl, setImageUrl] = useState(() => {
        const savedAiImage = localStorage.getItem("aiImageURL");
        return savedAiImage || images.ai_image_dummy;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const query = async (data) => {
    //     try {
    //         const response = await fetch(
    //             "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    //             {
    //                 headers: {
    //                     Authorization: "Bearer " + import.meta.env.VITE_HUGGING_FACE_IMAGE_GENERATION_API,
    //                     "Content-Type": "application/json",
    //                 },
    //                 method: "POST",
    //                 body: JSON.stringify(data),
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error("Failed to fetch image");
    //         }

    //         const result = await response.blob();
    //         return URL.createObjectURL(result);

    //     } catch (err) {
    //         setError(err.message);
    //         toast.error("Failed to Generate Image")
    //         console.log(err)
    //         setLoading(false);
    //     }
    // };

    const handleGenerate = async () => {
        const loadingToastId = toast.loading("Generating AI Image...");
        setLoading(true);
        setError(null);

        const generatedImage = await imageGenerator({
            inputs: prompt,
        }, imageModel);

        if (generatedImage) {
            toast.dismiss(loadingToastId);
            toast.success('Image Generated Successfully');
            setImageUrl(generatedImage);
            localStorage.setItem('aiImageURL', generatedImage)
            deductCredits(100)
        } else {
            toast.dismiss(loadingToastId);
            toast.error("Error in Generating AI Image, Please select another model and try again.")
            setImageUrl(images.ai_image_dummy);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (imageUrl) {
            localStorage.setItem("aiImageURL", imageUrl);
        }
    }, [imageUrl]);

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={TOOLS_IMAGES.ai_image_gen}
                    title={'AI Image Generator'}
                    description={'Generate images using AI'}
                />
            </GradientBox>
            <div className="bg-[#e7effe] max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-3 md:gap-5 p-6">
                {/* Left Section */}
                <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-1/2">
                    {/* Beta Version Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl md:text-2xl text-center font-bold text-[#5f13c5] mb-4">
                            🚀 Welcome to Our AI Image Generator!
                        </h2>
                        <p className="text-gray-600 text-sm text-justify">
                            Discover the power of AI to create stunning images from simple prompts. <br />
                            We have different AI image generation models, so if any model doesn't respond, you can use another model.
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

                        <div className="w-full mb-5">
                            <label
                                htmlFor="videoLanguage"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Select AI Model:
                            </label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#5f13c5] focus:outline-none"
                                value={imageModel}
                                onChange={(e) => setImageModel(e.target.value)}
                            >
                                {IMAGE_MODELS.map((item) => (
                                    <option key={item.id} value={item.model}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                    <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        {!loading ?
                            <img
                                src={imageUrl || images.ai_image_dummy}
                                alt="Generated"
                                className="rounded-lg shadow-md w-full"
                            />

                            : <div className='w-full flex flex-col h-[calc(60vh-2rem)] justify-center items-center'>
                                <img
                                    src={LOADING_GIFS.progress}
                                    alt="Generating"
                                    className="rounded-lg w-full max-w-44"
                                />
                                <h3 className='font-semibold mb-1'>Generating image...</h3>
                                <p className='text-sm text-gray-500'>Don't refresh or close the page.</p>

                            </div>
                        }
                        {imageUrl && imageUrl !== "/src/assets/dummy/ai_image.png" && (
                            <button
                                onClick={() => handleDownloadImage(imageUrl)}
                                disabled={loading}
                                className={`w-full mt-3 px-6 py-3 text-white font-medium rounded-lg shadow-md transition-colors ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#5f13c5] hover:bg-[#4a0fa3]"
                                    }`}
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