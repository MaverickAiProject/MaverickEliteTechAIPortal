import React, { useState } from 'react'
import { images, LOADING_GIFS, TOOLS_IMAGES } from '../assets/images'
import ContentContainer from '../components/ContentContainer'
import GradientBox from '../components/GradientBox'
import GradientInnerTitle from '../components/GradientInnerTitle'
import imageCompression from 'browser-image-compression'

function ImageCompressor() {
    const [originalImage, setOriginalImage] = useState(null)
    const [compressedImage, setCompressedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [originalSize, setOriginalSize] = useState(null)
    const [compressedSize, setCompressedSize] = useState(null)
    const [targetSize, setTargetSize] = useState(0.5) // Default target size 500KB

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            setOriginalImage(file)
            setOriginalSize((file.size / 1024 / 1024).toFixed(2)) // Convert to MB
            setCompressedImage(null)
            setCompressedSize(null)
        }
    }

    const handleCompression = async () => {
        if (!originalImage) return

        setLoading(true)
        try {
            let quality = 1.0 // Start with maximum quality
            let compressedFile = originalImage

            // Iteratively compress until it meets the target size
            while (compressedFile.size / 1024 / 1024 > targetSize) {
                const options = {
                    maxSizeMB: targetSize, // Target size in MB
                    maxWidthOrHeight: 1920, // Keep the resolution reasonable
                    useWebWorker: true,
                    initialQuality: quality, // Adjust quality dynamically
                }

                compressedFile = await imageCompression(originalImage, options)

                // Reduce quality for the next iteration if needed
                quality -= 0.1
                if (quality <= 0.1) break // Stop if quality gets too low
            }

            setCompressedImage(compressedFile)
            setCompressedSize((compressedFile.size / 1024 / 1024).toFixed(2)) // Convert to MB
        } catch (error) {
            console.error('Error compressing image:', error)
            alert('Error compressing image. Please try again.')
        }
        setLoading(false)
    }

    const downloadImage = () => {
        if (!compressedImage) return
        const link = document.createElement('a')
        link.href = URL.createObjectURL(compressedImage)
        link.download = `compressed_${originalImage.name}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const calculateCompression = () => {
        if (!originalSize || !compressedSize) return 0
        return (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
    }

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={TOOLS_IMAGES.image_compressor}
                    title={'Image Compressor'}
                    description={'Compress images to reduce file size'}
                />
            </GradientBox>

            <div className="compressor-container lg:max-w-[900px] lg:mx-auto py-6 px-4 lg:px-8 rounded-lg w-full mx-auto space-y-6">

                {/* Control Section */}
                <div className="controls flex flex-col gap-1 md:gap-3 lg:flex-row bg-white p-3 rounded-lg shadow-md justify-between items-center space-y-4 lg:space-y-0">
                    {/* File Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input w-full lg:w-1/3 p-4 bg-[#f0f4f8] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f13c5]"
                    />

                    {/* Target Size Selector */}
                    <div className="target-size flex items-center space-x-4 py-3 lg:w-1/3 flex-1 bg-[#f0f4f8] border border-gray-300 w-full px-3 rounded-lg">
                        <label className="text-lg font-semibold text-[#5f13c5] whitespace-nowrap mr-2">
                            Target Size:
                        </label>
                        <input
                            type="range"
                            min="0.05"
                            max="1"
                            step="0.05"
                            value={targetSize}
                            onChange={(e) => setTargetSize(e.target.value)}
                            className="w-[90%] accent-primary"
                        />
                        <div className="text-sm text-gray-600 m-0">{(targetSize * 1024).toFixed(0)}_Kb</div>
                    </div>

                    {/* Compress Button */}
                    <button
                        onClick={handleCompression}
                        disabled={!originalImage || loading}
                        className={`compress-btn px-8 py-3 bg-[#5f13c5] text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-[#4a0fa3] focus:outline-none disabled:bg-gray-400`}
                    >
                        {loading ? 'Compressing...' : 'Compress'}
                    </button>
                </div>

                {/* Preview Section */}
                <div className="image-preview grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Original/Dummy Image */}
                    <div className="original-section text-center bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-[#5f13c5] mb-4">Original Image</h3>
                        {originalImage ? (
                            <img
                                src={URL.createObjectURL(originalImage)}
                                alt="Original"
                                className="rounded-lg shadow-md mx-auto"
                            />
                        ) : (
                            <img
                                src={images.dummy_image} //  dummy image
                                alt="Dummy"
                                className="rounded-lg shadow-md mx-auto w-full"
                            />
                        )}
                        {originalImage && <p className="mt-2 text-gray-600">Size: {originalSize} MB</p>}
                    </div>

                    {/* Compressed/Dummy Image */}
                    <div className="compressed-section text-center bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-[#5f13c5] mb-4">Compressed Image</h3>
                        {compressedImage ? (
                            <>
                                {loading
                                    ? <div className='h-full flex flex-col items-center md:mt-[25%] '>
                                        <img
                                            src={LOADING_GIFS.image_compress_loading} //  dummy image
                                            alt="loading"
                                            className="rounded-lg mx-auto w-[150px]"
                                        />
                                        <p className='mt-2 text-gray-600'>Compressing Image...</p>
                                    </div>
                                    :
                                    <div>
                                        <img
                                            src={URL.createObjectURL(compressedImage)}
                                            alt="Compressed"
                                            className="rounded-lg shadow-md mx-auto"
                                        />
                                        <p className="mt-2 text-gray-600">Size: {compressedSize} MB</p>
                                        <p className="mt-2 text-green-600 font-semibold">
                                            Compression: {calculateCompression()}% smaller
                                        </p>
                                    </div>
                                }
                                {!loading &&
                                    <button
                                        onClick={downloadImage}
                                        className="mt-4 px-6 py-3 bg-[#5f13c5] text-white font-medium rounded-lg shadow-md hover:bg-[#4a0fa3] transition-colors"
                                    >
                                        Download Compressed Image
                                    </button>
                                }
                            </>
                        ) : (
                            loading
                                ? <div className='h-full flex flex-col items-center md:mt-[25%]'>
                                    <img
                                        src={LOADING_GIFS.image_compress_loading} //  dummy image
                                        alt="loading"
                                        className="rounded-lg mx-auto w-[150px]"
                                    />
                                    <p className='mt-2 text-gray-600'>Compressing Image</p>
                                </div>
                                : <img
                                    src={images.dummy_image} //  dummy image
                                    alt="Dummy"
                                    className="rounded-lg shadow-md mx-auto w-full"
                                />
                        )}
                    </div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default ImageCompressor
