import React, { useContext, useEffect, useState } from 'react'
import ContentContainer from '../components/ContentContainer'
import GradientBox from '../components/GradientBox'
import GradientInnerTitle from '../components/GradientInnerTitle'
import { images } from '../assets/images'
import { OFFERS } from '../utils/offers'
import CreditProgressBar from '../components/CreditsBalance'
import { Context } from '../context/Context'

function Billing() {
    const { credits, maxLimit, handleBuyCredits } = useContext(Context);
    const offers = OFFERS;

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={images.billing_logo}
                    title={'Low Balance? Buy more credits'}
                    description={'You can buy more credits if your balance is low and then enjoy.'}
                />
            </GradientBox>
            <div className='p-5 flex flex-wrap gap-4  '>
                <div className='max-w-[500px] md:w-5/6 lg:w-3/5 w-[100%] mx-auto h-[calc(100vh-210px)] md:h-full'>
                    <div className='flex justify-between py-3 px-5 gap-6 bg-whiteCard items-center transition-all ease-in-out duration-500 mb-3 shadow-sm rounded-lg'>
                        <div className='flex-1'>
                            <h2 className='font-semibold text-textColor text-sm md:text-lg mb-2'>Your Credits Balance</h2>
                            <CreditProgressBar />
                            <p className='text-greyText md:text-xs text-[12px] mt-1 '>{`${credits}/${maxLimit} Credits Left`}</p>
                        </div>
                        <h1 className='md:text-5xl text-4xl text-textColor font-semibold'>{credits}</h1>
                    </div>

                    <div className='bg-mainPurple text-activeText md:p-4 p-2 rounded-lg mb-3'>
                        <h3 className='mb-3 text-center'>Buy Credits</h3>
                        <div className='flex gap-3 justify-center flex-wrap'>
                            {offers.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col gap-3 justify-between text-center p-1 bg-white text-black rounded-lg md:flex-1 cursor-pointer w-[45%] md:w-auto transition-all duration-300 hover:shadow-lg hover:shadow-purple-950 hover:bottom-2 relative bottom-0'
                                    onClick={() => handleBuyCredits(item.amount)}
                                >
                                    <div>
                                        <h4 className={`font-semibold text-base ${item.textColor}`}>{item.title}</h4>
                                        <p className='text-gray-500 text-xs'>{item.save}</p>
                                    </div>
                                    <div>
                                        <h1 className='text-4xl font-bold'>{item.credits}</h1>
                                        <p>Credits</p>
                                    </div>
                                    <button className={`text-white rounded-md py-1 font-semibold ${item.bgColor}`} >₹ {item.amount}</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className='bg-black text-[#fada00] flex justify-between p-3 gap-3 items-center rounded-lg cursor-pointer duration-300 hover:scale-105'
                        onClick={() => handleBuyCredits(420)}
                    >
                        <div className='flex-1 text-left'>
                            <h1 className='sm:text-4xl text-2xl mb-2 font-semibold'>Mega Gold Pack</h1>
                            <p>Super Savings of ₹ 80/-</p>
                        </div>
                        <div className='text-center'>
                            <h1 className='sm:text-4xl text-3xl font-bold'>5000</h1>
                            <p className='mb-2 text-xs sm:text-sm'>Credits</p>
                            <button className='bg-[#fada00] text-black sm:px-4 px-2 text-xs py-1 rounded-2xl sm:text-sm font-semibold'>Only ₹420</button>
                        </div>
                    </div>
                </div>

            </div>
        </ContentContainer>
    )
}

export default Billing
