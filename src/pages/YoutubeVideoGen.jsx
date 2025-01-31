import React, { useContext, useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import GradientBox from "../components/GradientBox";
import GradientInnerTitle from "../components/GradientInnerTitle";
import { YOUTUBENICHE } from "../utils/constants";
import { LANGUAGES } from "../utils/languagesData";
import generateContent from "../services/generateContent";
import toast from 'react-hot-toast';
import { images, TOOLS_IMAGES } from "../assets/images";
import { IMAGE_MODELS } from "../utils/aiModel";
import { imageGenerator } from "../services/imageGenerator";
import { handleDownloadImage } from "../services/downloadImage";
import { Context } from "../context/Context";

function YoutubeVideoGen() {
    const { checkCredits, deductCredits } = useContext(Context)

    const youtubeNiche = YOUTUBENICHE;
    const languages = LANGUAGES;
    const [loading, setLoading] = useState(false);

    const [niche, setNiche] = useState(() =>
        localStorage.getItem("niche") || "Tech and Gadgets"
    );

    const [customNiche, setCustomNiche] = useState('')

    const [videoLanguage, setVideoLanguage] = useState(() =>
        localStorage.getItem("videoLanguage") || "English (US)"
    );

    const [selectedTopic, setSelectedTopic] = useState(() => {
        const savedTopic = localStorage.getItem("selectedTopic");
        return savedTopic ? JSON.parse(savedTopic) : { heading: null, description: null };
    });

    const [allTopics, setAllTopics] = useState(() => {
        const savedTopics = localStorage.getItem("allTopics");
        return savedTopics ? JSON.parse(savedTopics) : [];
    });

    const [script, setScript] = useState(() => {
        const savedScript = localStorage.getItem("script");
        return savedScript ? JSON.parse(savedScript) : [];
    });

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("niche", niche);
    }, [niche]);

    useEffect(() => {
        localStorage.setItem("videoLanguage", videoLanguage);
    }, [videoLanguage]);

    useEffect(() => {
        localStorage.setItem("selectedTopic", JSON.stringify(selectedTopic));
    }, [selectedTopic]);

    useEffect(() => {
        localStorage.setItem("allTopics", JSON.stringify(allTopics));
    }, [allTopics]);

    useEffect(() => {
        localStorage.setItem("script", JSON.stringify(script));
    }, [script]);

    const handleGetTopics = async () => {
        const loadingToastId = toast.loading("Generating topics...");
        setLoading(true);

        if (niche && videoLanguage) {
            try {
                const res = await generateContent({
                    responseType: "application/json",
                    inputPrompt: `I want to make a long video in 2025 for Youtube on the niche: ${customNiche ? customNiche : niche} in language: ${videoLanguage}. Give me an array of 8 objects of suggestions. For each, give me a key-value pair of two things - heading and description.`,
                });

                if (res) {
                    setAllTopics(JSON.parse(res));
                    setLoading(false);
                    toast.dismiss(loadingToastId);
                    toast.success('Topics Generated Successfully')
                } else {
                    toast.dismiss(loadingToastId);
                    toast.error("Error in generating topics.");
                }
            } catch (error) {
                toast.dismiss(loadingToastId);
                toast.error("Error in getting topics", error);
                console.log(error);
                setLoading(false);
            }
        } else {
            setLoading(false)
        }
    };

    const generateScript = async () => {
        const loadingToastId = toast.loading("Generating script...");
        setLoading(true);
        if (selectedTopic.heading && selectedTopic.description) {

            const hasCredits = await checkCredits(50);
            if (!hasCredits) {
                toast.dismiss(loadingToastId);
                setLoading(false);
                return;
            }

            try {
                const res = await generateContent({
                    responseType: "application/json",
                    inputPrompt: `Write a script to generate 5 minutes video on topic: ${selectedTopic.heading} and description ${selectedTopic.description} along with AI image prompt for each scene (the AI Prompt must be fully descriptive of the scene. The length of Image prompt must be minimum 30 words) and give me result in an array of multiple objects (minimum 8) with id, imagePrompt, scene and ContentText (The length of ContentText must be minimum 30 words. It can have many lines also.) as field, No Plain text.`,
                });

                if (res) {
                    setScript(JSON.parse(res));
                    toast.dismiss(loadingToastId);
                    toast.success('Script Generated Successfully ')
                    deductCredits(50);
                    setLoading(false);
                } else {
                    toast.dismiss(loadingToastId);
                    toast.error("Error in generating script.");
                }
            } catch (error) {
                toast.dismiss(loadingToastId);
                toast.error("Error in getting topics", error);
                console.log(error);
                setLoading(false);
            }
        } else {
            setLoading(false)
        }
    }

    const handleGenerateOtherVideo = () => {
        localStorage.removeItem("selectedTopic");
        localStorage.removeItem("allTopics");
        localStorage.removeItem("script");

        setSelectedTopic({ heading: null, description: null })
        setAllTopics([]);
        setScript([])
    }

    const handleGenerateYtImage = async (id, inputData) => {
        const loadingToastId = toast.loading("Generating AI Image...");
        setLoading(true);

        const generatedImage = await imageGenerator({
            inputs: inputData,
        }, IMAGE_MODELS[0].model);

        if (generatedImage) {
            toast.dismiss(loadingToastId);
            toast.success('Scene Image Generated');

            const updatedScript = script.map(scene =>
                scene.id === id
                    ? { ...scene, image: generatedImage }
                    : scene
            )
            setScript(updatedScript);

            localStorage.setItem("script", JSON.stringify(updatedScript));
            // deductCredits(100)
        } else {
            toast.dismiss(loadingToastId);
            toast.error("Error in Generating AI Image.")
        }

        setLoading(false);
    }

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={TOOLS_IMAGES.youtube_videos_ideas}
                    title={"Youtube Video Generator"}
                    description={"Generate Youtube Videos using AI"}
                />
            </GradientBox>

            <div className="m-5 ABCD-SECTION">

                {/* Generated Script Section */}
                {script.length > 0 && (
                    <div className="bg-whiteCard p-4 mb-8 shadow-md rounded-lg flex flex-col items-center ease-in-out transition-all duration-500">
                        <h1 className="text-purpleText text-3xl text-center mb-5 font-bold">🚀 Video Generated Successfully!</h1>
                        {selectedTopic.heading && (
                            <div className="p-3 mb-3 bg-dashboardBg text-textColor border-[1px] border-purpleText sticky rounded-lg shadow-md">
                                <h2 className="text-lg font-bold text-purpleText mb-2">Selected Topic</h2>
                                <p className="text-sm mb-2">
                                    <span className="font-bold">Heading:</span> {selectedTopic.heading}
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">Description:</span> {selectedTopic.description}
                                </p>
                            </div>
                        )}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {script.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-dashboardBg border border-gray-500 rounded-lg shadow-md ursor-pointer  transform transition-transform duration-200 hover:shadow-lg"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-purpleText mb-2">{`Scene ${index + 1}`}</h3>
                                        <p className="text-sm text-textColor">{item.ContentText}</p>
                                        <p className="text-sm mt-2 text-greyText">
                                            <span className="font-bold text-textColor">Image Prompt:</span> {item.imagePrompt}
                                        </p>
                                        {/* {item.image && */}
                                        <button
                                            onClick={() => handleGenerateYtImage(item.id, item.imagePrompt)}
                                            disabled={loading}
                                            className={`px-6 py-2 mt-3 text-white font-medium rounded-md shadow-md focus:outline-none 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-mainPurple hover:bg-mainPurpleDark"}`}
                                        >
                                            {loading ? "Loading..." : "Generate Image"}
                                        </button>
                                        {/* } */}
                                    </div>
                                    {item.image &&
                                        <div className="mt-4 w-full">
                                            <img src={item.image} alt="script image" className="rounded-lg shadow-md w-full" />
                                            <button
                                                onClick={() => handleDownloadImage(item.image)}
                                                className={`w-full mt-3 px-6 py-3 text-white font-medium rounded-lg shadow-md transition-colors ${loading
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-mainPurple hover:bg-mainPurpleDark"
                                                    }`}
                                            >
                                                Download Image
                                            </button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleGenerateOtherVideo}
                            className={`px-6 py-2 mt-6 text-white font-medium rounded-md shadow-md focus:outline-none 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-mainPurple hover:bg-mainPurpleDark"}`}
                        >
                            {loading ? "Loading..." : "Generate Other Video"}
                        </button>
                    </div>
                )}

                {/* Form Section */}
                <div className="flex flex-col bg-whiteCard mt-6 rounded-lg p-5 md:flex-row gap-6 mb-6 items-start shadow-md">
                    <div className="w-full">
                        <label
                            htmlFor="niche"
                            className="block text-sm font-medium text-greyText mb-2"
                        >
                            Select a Niche:
                        </label>
                        <select
                            id="niche"
                            className="w-full px-4 py-2 bg-inputBg text-textColor border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-purpleText focus:outline-none"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                        >
                            {youtubeNiche.map((item) => (
                                <option key={item.id} value={item.nicheName}>
                                    {item.nicheName}
                                </option>
                            ))}
                        </select>
                        {niche === 'Custom' &&
                            <textarea
                                type="text"
                                value={customNiche}
                                onChange={(e) => setCustomNiche(e.target.value)}
                                placeholder="Enter your prompt"
                                className="w-full p-3 mt-4 border bg-inputBg text-textColor border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purpleText focus:border-transparent mb-4"
                            />
                        }

                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="videoLanguage"
                            className="block text-sm font-medium text-greyText mb-2"
                        >
                            Select a Language:
                        </label>
                        <select
                            id="videoLanguage"
                            className="w-full px-4 py-2 border bg-inputBg text-textColor border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purpleText focus:outline-none"
                            value={videoLanguage}
                            onChange={(e) => setVideoLanguage(e.target.value)}
                        >
                            {languages.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleGetTopics}
                        disabled={loading}
                        className={`px-6 py-2 text-white font-medium rounded-md shadow-md focus:outline-none 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-mainPurple hover:bg-mainPurpleDark"}`}
                    >
                        {loading ? "Loading..." : "Generate Topics"}
                    </button>
                </div>

                <div className="flex flex-col-reverse sm:flex-row-reverse gap-4 mt-6 ">
                    {/* Topics Section */}
                    {allTopics.length > 0 && (
                        <div className="mb-3">
                            <h2 className="text-purpleText text-xl mb-3 font-bold">{selectedTopic.heading ? 'Topic selected successfully. If you want another topic, click another 👉' : `Select a topic to continue 👉`}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {allTopics.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-transform duration-200"
                                        onClick={() => setSelectedTopic(item)}
                                    >
                                        <h3 className="text-lg font-bold">{item.heading}</h3>
                                        <p className="text-sm mt-2">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Selected Topic */}
                    {selectedTopic.heading && (
                        <div className="p-3 mb-3 bg-whiteCard text-textColor border-[3px] border-purpleText rounded-lg shadow-md">
                            <h2 className="text-lg font-bold text-purpleText mb-2">Selected Topic</h2>
                            <p className="text-sm mb-2">
                                <span className="font-bold">Heading:</span> {selectedTopic.heading}
                            </p>
                            <p className="text-sm mb-4">
                                <span className="font-bold">Description:</span> {selectedTopic.description}
                            </p>
                            <button
                                onClick={generateScript}
                                disabled={loading}
                                className={`px-6 py-2 text-white font-medium rounded-md shadow-md focus:outline-none 
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-mainPurple hover:bg-mainPurpleDark"}`}
                            >
                                {loading ? "Generating Script..." : "Generate Script"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </ContentContainer>
    );
}

export default YoutubeVideoGen;
