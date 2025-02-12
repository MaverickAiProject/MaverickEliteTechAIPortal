import React, { useState } from 'react'
import { images } from '../../assets/images'
import { useAuth } from '../../context/AuthContext'

function ExternalProviders() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { handleSignInWithGoogle, handleSignInWithFacebook } = useAuth()

    const handleGoogle = async () => {
        setError(null)
        setLoading(true)
        try {
            await handleSignInWithGoogle()
        } catch (error) {
            setError(error?.message)
        }
        setLoading(false)
    }

    // const handleFacebook = async () => {
    //     setError(null)
    //     setLoading(true)
    //     try {
    //         await handleSignInWithFacebook()
    //     } catch (error) {
    //         setError(error?.message)
    //     }
    //     setLoading(false)
    // }

    return (
        <div className='flex flex-col gap-2 items-center justify-center mb-4 w-full'>
            <div className="flex gap-3 w-full">
                <div
                    className="flex gap-4 justify-center items-center border border-gray-300 px-3 py-2 rounded-xl w-full cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out"
                    onClick={handleGoogle}
                >
                    <img src={images.google} alt="google" className="w-6" />
                    <h2 className="font-semibold text-lg">{loading ? 'Loading...' : 'Continue with Google'}</h2>
                </div>
                {/* <div
                    className="flex gap-2 justify-center items-center border border-gray-300 px-3 py-2 rounded-xl w-full cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out"
                    onClick={handleFacebook}
                >
                    <img src={images.fb} alt="google" className="w-6" />
                    <h2 className="font-semibold text-lg">Facebook</h2>
                </div> */}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

export default ExternalProviders
