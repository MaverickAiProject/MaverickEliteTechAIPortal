import React, { useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import GradientBox from "../components/GradientBox";
import GradientInnerTitle from "../components/GradientInnerTitle";
import { YOUTUBENICHE } from "../utils/constants";
import { LANGUAGES } from "../utils/languagesData";
import generateContent from "../services/generateContent";
import toast from 'react-hot-toast';
import { TOOLS_IMAGES } from "../assets/images";

function YoutubeVideoGen() {
    const youtubeNiche = YOUTUBENICHE;
    const languages = LANGUAGES;
    const [loading, setLoading] = useState(false);

    const [niche, setNiche] = useState(() =>
        localStorage.getItem("niche") || "Tech and Gadgets"
    );

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
                    inputPrompt: `I want to make a long video in 2025 for Youtube on the niche: ${niche} in language: ${videoLanguage}. Give me an array of 8 objects of suggestions. For each, give me a key-value pair of two things - heading and description.`,
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
            try {
                const res = await generateContent({
                    responseType: "application/json",
                    inputPrompt: `Write a script to generate 5 minutes video on topic: ${selectedTopic.heading} and description ${selectedTopic.description} along with AI image prompt in Realistic format for each scene and give me result in an array of multiple objects with imagePrompt, scene and ContentText as field, No Plain text.`,
                });

                if (res) {
                    setScript(JSON.parse(res));
                    toast.dismiss(loadingToastId);
                    toast.success('Script Generated Successfully ')
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
                    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
                        <h1 className="text-primary text-3xl text-center mb-5 font-bold">🚀 Video Generated Successfully!</h1>
                        {selectedTopic.heading && (
                            <div className="p-3 bg-gray-100 border-[1px] border-[#5f13c5] sticky rounded-lg shadow-md">
                                <h2 className="text-lg font-bold text-[#5f13c5] mb-2">Selected Topic</h2>
                                <p className="text-sm mb-2">
                                    <span className="font-bold">Heading:</span> {selectedTopic.heading}
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">Description:</span> {selectedTopic.description}
                                </p>
                            </div>
                        )}
                        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {script.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-md ursor-pointer hover:scale-105 transform transition-transform duration-200 hover:shadow-lg"
                                >
                                    <h3 className="text-lg font-bold text-[#5f13c5] mb-2">{`Scene ${index + 1}`}</h3>
                                    <p className="text-sm text-gray-800">{item.ContentText}</p>
                                    <p className="text-sm mt-2">
                                        <span className="font-bold">Image Prompt:</span> {item.imagePrompt}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleGenerateOtherVideo}
                            className={`px-6 py-2 mt-6 text-white font-medium rounded-md shadow-md focus:outline-none 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5f13c5] hover:bg-[#4e0f9f]"}`}
                        >
                            {loading ? "Loading..." : "Generate Other Video"}
                        </button>
                    </div>
                )}

                {/* Form Section */}
                <div className="flex flex-col bg-white mt-6 rounded-lg p-5 md:flex-row gap-6 mb-6 items-end shadow-md">
                    <div className="w-full">
                        <label
                            htmlFor="niche"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Select a Niche:
                        </label>
                        <select
                            id="niche"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#5f13c5] focus:outline-none"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                        >
                            {youtubeNiche.map((item) => (
                                <option key={item.id} value={item.nicheName}>
                                    {item.nicheName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="videoLanguage"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Select a Language:
                        </label>
                        <select
                            id="videoLanguage"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#5f13c5] focus:outline-none"
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
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5f13c5] hover:bg-[#4e0f9f]"}`}
                    >
                        {loading ? "Loading..." : "Generate Topics"}
                    </button>
                </div>

                <div className="flex flex-col-reverse sm:flex-row-reverse gap-4 mt-6 ">
                    {/* Topics Section */}
                    {allTopics.length > 0 && (
                        <div>
                            <h2 className="text-primary mb-3 text-xl font-bold">{selectedTopic.heading ? 'Topic selected successfully. If you want another topic, click another 👉' : `Select a topic to continue 👉`}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        <div className="p-3 bg-gray-100 border-[3px] border-[#5f13c5] rounded-lg shadow-md">
                            <h2 className="text-lg font-bold text-[#5f13c5] mb-2">Selected Topic</h2>
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
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5f13c5] hover:bg-[#4e0f9f]"}`}
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
