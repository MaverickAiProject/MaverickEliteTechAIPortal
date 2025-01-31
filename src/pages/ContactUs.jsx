import React from 'react';

function ContactUs() {
    return (
        <div id='main-outer-container'>
            {/* Header Section */}
            <div className='bg-mainPurple text-white text-center py-10 px-4'>
                <h1 className='text-3xl md:text-5xl font-bold mb-4'>Contact Us</h1>
                <p className='text-sm md:text-md max-w-[90%] md:max-w-[400px] mx-auto'>
                    Got questions, feedback, or need assistance? We're here to help.
                </p>
            </div>

            {/* Main Content */}
            <div id="main-inner" className='flex flex-col md:flex-row w-[90%] max-w-[1200px] mx-auto my-12 gap-12'>
                {/* Contact Info Section */}
                <div className='bg-[#f3f8ff] p-8 rounded-lg md:w-[40%] flex flex-col gap-6  border border-[#6f00ff4a]'>
                    <h2 className='text-2xl font-bold mb-4 text-primary'>Get In Touch</h2>
                    <p className='text-gray-600'>
                        Reach out to us for queries, support, or to collaborate. We’re just a message away.
                    </p>
                    <div>
                        <h3 className='font-semibold text-lg text-primary'>Email Us:</h3>
                        <p className='text-gray-600'>maverick.aiproject@gmail.com</p>
                    </div>
                    <div>
                        <img src="/contactUs.webp" alt="contact img" />
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className='bg-[#e7effe] rounded-lg p-8 flex-1 shadow-lg'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-6 text-center text-primary'>Send Us a Message</h2>
                    <form className='flex flex-col gap-4' action='mailto:maverick.aiproject@gmail.com'>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className='mb-2 font-semibold text-gray-700'>Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder="Enter your full name"
                                className='p-2 border border-gray-300 rounded focus:outline-primary'
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='mb-2 font-semibold text-gray-700'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder="Enter your email address"
                                className='p-2 border border-gray-300 rounded focus:outline-primary'
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='subject' className='mb-2 font-semibold text-gray-700'>Subject</label>
                            <input
                                type='text'
                                id='subject'
                                name='subject'
                                placeholder="Enter the subject"
                                className='p-2 border border-gray-300 rounded focus:outline-primary'
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='message' className='mb-2 font-semibold text-gray-700'>Message</label>
                            <textarea
                                id='message'
                                name='message'
                                placeholder="Write your message here"
                                className='p-2 border border-gray-300 rounded focus:outline-primary'
                                rows='5'
                                required
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className='bg-mainPurple text-white py-3 px-6 rounded shadow-lg hover:bg-mainPurple-dark transition duration-300 mt-4'>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Section */}
            <div className='bg-mainPurple text-white text-center py-10 px-4'>
                <h1 className='text-3xl md:text-5xl font-bold mb-6'>Let’s Build Something Great Together</h1>
                <p>We value your feedback and inquiries. Stay connected with Maverick AI.</p>
                <p className='mt-4'>Copyright &copy; Maverick @2024</p>
            </div>
        </div>
    );
}

export default ContactUs;
