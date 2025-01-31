import React, { useContext, useEffect, useState } from 'react';
import ContentContainer from '../components/ContentContainer';
import GradientBox from '../components/GradientBox';
import GradientInnerTitle from '../components/GradientInnerTitle';
import { images, LOADING_GIFS, TOOLS_IMAGES } from '../assets/images';
import { LANGUAGES } from '../utils/languagesData';
import { Context } from '../context/Context';

function TextToVoice() {
    const { deductCredits } = useContext(Context)

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("en-us");
    const [voices, setVoices] = useState([])
    const [selectedVoice, setSelectedVoice] = useState("Linda (Female)");

    useEffect(() => {
        const langData = LANGUAGES.find(lang => selectedLanguage === lang.value)
        setVoices(langData.voices)
    }, [selectedLanguage])

    const handleGenerate = async () => {
        if (!text.trim()) {
            setError("Please enter text to generate speech!");
            return;
        }

        setLoading(true);
        setError(null);
        setAudioUrl(null);

        try {
            const response = await fetch(
                `https://api.voicerss.org/?key=${'a0cec6f432d745d19be0ae4323bbb5c0'}&hl=${selectedLanguage}&v=${selectedVoice}&src=${encodeURIComponent(text)}&c=MP3`);

            if (!response.ok) {
                throw new Error("Failed to generate audio.");
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            deductCredits(70);

        } catch (err) {
            setError("An error occurred while generating the audio.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!audioUrl) return;
        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = "maverick-generated-audio.mp3";
        link.click();
    };

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={TOOLS_IMAGES.text_to_voice}
                    title={'AI Text-to-Voice Generator'}
                    description={'Generate speech from text using AI'}
                />
            </GradientBox>
            <div className="max-w-[1200px] mx-auto min-h-fit items-start grid reve grid=cols-1 sm:grid-cols-2 justify-center gap-2 md:gap-4 p-6">
                {/* Left Section */}
                <div className="flex flex-col order-last sm:order-first gap-4 md:gap-6 ">
                    {/* Input & Button Card */}
                    <div className="bg-whiteCard p-6 rounded-lg shadow-md">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your text here"
                            rows="5"
                            className="w-full p-3 border bg-inputBg text-textColor border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purpleText focus:border-transparent mb-4"
                        ></textarea>

                        <div>
                            <select
                                value={selectedLanguage}
                                onChange={(e) => { setSelectedLanguage(e.target.value) }}
                                className="w-full p-3 bg-inputBg text-textColor border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purpleText focus:border-transparent mb-4"
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang.id} value={lang.value}>{lang.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {selectedLanguage
                                ? <select
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(e.target.value)}
                                    className="w-full p-3 bg-inputBg text-textColor border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purpleText focus:border-transparent mb-4"
                                >
                                    {voices.map((voice, index) => (
                                        <option key={index} value={voice.name}>{voice.name} ({voice.gender})</option>
                                    ))}
                                </select>
                                : null
                            }
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`w-full px-6 py-3 text-white font-medium rounded-lg shadow-md transition-colors ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-mainPurple hover:bg-mainPurpleDark"
                                }`}
                        >
                            {loading ? "Generating..." : "Generate Voice"}
                        </button>
                        {error && <p className="mt-4 text-red-600">{error}</p>}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex justify-center items-center">
                    <div className="bg-whiteCard p-6 rounded-lg shadow-md w-full ">
                        {!loading ? (
                            audioUrl ? (
                                <audio controls className="w-full">
                                    <source src={audioUrl} type="audio/mpeg" />
                                    Your browser does not support the audio tag.
                                </audio>
                            ) : (
                                <img
                                    src={images.text_to_voice_dummy}
                                    alt="AI Placeholder"
                                    className="rounded-lg shadow-md mx-auto max-w-[300px] sm:max-w-lg w-full"
                                />
                            )
                        ) : (
                            <div className='w-full flex flex-col min-h-48 sm:min-h-[340px] justify-center items-center'>
                                <img
                                    src={LOADING_GIFS.microphone}
                                    alt="Generating..."
                                    className="rounded-lg w-3/12 sm:w-32"
                                />
                                <h3 className='font-semibold mb-1'>Generating audio...</h3>
                                <p className='text-sm text-gray-500'>Don't refresh or close the page.</p>
                            </div>
                        )}

                        {audioUrl && (
                            <button
                                onClick={handleDownload}
                                className="mt-4 w-full px-6 py-3 bg-[#5f13c5] text-white font-medium rounded-lg shadow-md hover:bg-[#4a0fa3] transition-colors"
                            >
                                Download Audio
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}

export default TextToVoice;
