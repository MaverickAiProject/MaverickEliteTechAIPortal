import React from 'react'

function VerifyMailCard({ newUser, handleEmailChange, LogoVideo }) {
    return (
        <div className='mt-10'>
            <h1 className="text-3xl font-bold text-purpleText text-center">
                Verify your Email
            </h1>
            <p className="text-center text-textColor my-6 text-lg">{`We have sent you a verification mail at ${newUser.email} Open your Email Inbox and click on the link to verify your email.`}</p>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-mainPurple text-white font-bold rounded-xl text-xl hover:bg-mainPurpleDark transition duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-light text-center flex items-center justify-center"
                onClick={handleEmailChange}
            >
                Want to use another email? Click here.
            </button>
        </div>
    )
}

export default VerifyMailCard
