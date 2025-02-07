import React from 'react'
import ImageComp from './ImageComp'
import YoutubeComp from './YoutubeComp'
import InstagramComp from './InstagramComp'
import TextToVoiceComp from './TextToVoiceComp'
import ImageCompressComp from './ImageCompressComp'
import ExploreMoreComp from './ExploreMoreComp'

function DashboardLayout() {
    return (
        <div className='py-2 pb-5 rounded-lg flex flex-col gap-3'>
            <div className='flex gap-3 flex-col xl:flex-row'>
                <div className='flex flex-col gap-3'>
                    <div className='md:mt-4 mt-1 flex-1'>
                        <ImageComp />
                    </div>
                    <div className=''>
                        <InstagramComp />
                    </div>
                </div>
                <div className='sm:min-w-[400px]'>
                    <YoutubeComp />
                </div>
            </div>

            <div className='mt-3 gap-3 grid sm:grid-cols-2 lg:grid-cols-3 w-full'>
                <div className=''>
                    <ImageCompressComp />
                </div>
                <div className=''>
                    <TextToVoiceComp />
                </div>
                <div className=''>
                    <ExploreMoreComp />
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout