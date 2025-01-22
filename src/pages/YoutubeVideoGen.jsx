import React, { useState } from "react";
import ContentContainer from "../components/ContentContainer";
import GradientBox from "../components/GradientBox";
import GradientInnerTitle from "../components/GradientInnerTitle";
import { YOUTUBENICHE } from "../utils/constants";
import { LANGUAGES } from "../utils/languagesData";
import generateContent from "../services/generateContent";
import { toast } from "react-toastify";

function YoutubeVideoGen() {
    const youtubeNiche = YOUTUBENICHE;
    const languages = LANGUAGES;
    const [loading, setLoading] = useState(false);
    const [niche, setNiche] = useState("Tech and Gadgets");
    const [videoLanguage, setVideoLanguage] = useState("English (US)");
    const [selectedTopic, setSelectedTopic] = useState({
        heading: null,
        description: null,
    });

    const [allTopics, setAllTopics] = useState([]);
    const [script, setScript] = useState([])

    const handleGetTopics = async () => {
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
                } else {
                    toast.error("Error in generating topics.");
                }
            } catch (error) {
                toast.error("Error in getting topics", error);
                console.log(error);
                setLoading(false);
            }
        } else {
            setLoading(false)
        }
    };

    const generateScript = async () => {

        setLoading(true);
        if (selectedTopic.heading && selectedTopic.description) {
            try {
                const res = await generateContent({
                    responseType: "application/json",
                    inputPrompt: `Write a script to generate 5 minutes video on topic: ${selectedTopic.heading} and description ${selectedTopic.description} along with AI image prompt in Realistic format for each scene and give me result in an array of multiple objects with imagePrompt, scene and ContentText as field, No Plain text.`,
                });

                if (res) {
                    setScript(JSON.parse(res));
                    setLoading(false);
                } else {
                    toast.error("Error in generating topics.");
                }
            } catch (error) {
                toast.error("Error in getting topics", error);
                console.log(error);
                setLoading(false);
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    title={"Youtube Video Generator"}
                    description={"Generate Youtube Videos using AI"}
                />
            </GradientBox>
            <div className="p-5 ABCD-SECTION bg-white rounded-lg shadow-lg">
                {/* Form Section */}
                <div className="flex flex-col md:flex-row gap-6 mb-6 items-end">
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
                        {loading ? "Loading..." : "Get Topics"}
                    </button>
                </div>

                {/* Topics Section */}
                {allTopics.length > 0 && (
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
                )}

                {/* Selected Topic */}
                {selectedTopic.heading && (
                    <div className="mt-6 p-4 bg-gray-100 border-l-4 border-[#5f13c5] rounded-lg shadow-md">
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

                {/* Generated Script Section */}
                {script.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {script.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                            >
                                <h3 className="text-lg font-bold text-[#5f13c5] mb-2">{`Scene ${index + 1}`}</h3>
                                <p className="text-sm text-gray-800">{item.ContentText}</p>
                                <p className="text-sm mt-2">
                                    <span className="font-bold">Image Prompt:</span> {item.imagePrompt}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>



        </ContentContainer>
    );
}

export default YoutubeVideoGen;
