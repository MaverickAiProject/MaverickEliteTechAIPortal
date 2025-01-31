import React from 'react';

function AboutUs() {
    return (
        <div id='main-outer-container'>
            {/* Header Section */}
            <div className='bg-mainPurple text-white text-center py-10 px-4'>
                <h1 className='text-3xl md:text-5xl font-bold mb-4'>About Us</h1>
                <p className='text-sm md:text-md max-w-[90%] md:max-w-[400px] mx-auto'>
                    Read more about us. Our vision, mission, success, and much more you might love.
                </p>
            </div>

            {/* Main Content */}
            <div id="main-inner" className='w-[90%] max-w-[1200px] mx-auto'>

                {/* Who We Are and Mission Section */}
                <div className='flex flex-col md:flex-row gap-8 md:gap-14 py-8 items-center w-full my-8 text-center md:text-left'>
                    <div className='flex flex-col flex-1'>
                        <div className='border-b border-gray-300 pb-8'>
                            <h1 className='text-2xl md:text-4xl font-bold mb-4'>Who We Are</h1>
                            <p className='text-gray-600'>
                                At Maverick AI Tools, we are passionate about empowering individuals and businesses with the power of Artificial Intelligence. From automated tools that save time to advanced systems that boost efficiency, we believe in leveraging technology to make complex tasks effortless.
                            </p>
                        </div>

                        <div className='mt-12 border-b border-gray-300 pb-8'>
                            <h1 className='text-2xl md:text-4xl font-bold mb-4'>Our Mission</h1>
                            <p className='text-gray-600'>
                                Our mission is to make AI accessible to everyone, regardless of technical expertise. We strive to create user-friendly tools that address real-world problems, enabling our users to focus on what truly matters.
                            </p>
                        </div>
                    </div>

                    <div className='w-full md:w-[40%]'>
                        <img src="/robot.webp" alt="Who We Are" className='w-4/5 md:w-full rounded-lg mx-auto' />
                    </div>
                </div>

                {/* Application Working Section */}
                <div className='text-center'>
                    <h2 className='mb-2 text-2xl md:text-3xl font-bold px-4 max-w-[500px] mx-auto'>
                        Take A Look at our AI Tools
                    </h2>
                    <p className='text-gray-500 mb-6 max-w-[700px] w-full mx-auto'>
                        Our AI tools are designed to simplify complex tasks and enhance productivity. Explore our range of applications to see how AI can transform your workflow.
                    </p>
                    <div className='w-full md:w-[70%] mx-auto shadow-lg'>
                        <img src="/ai_tools.png" className='w-full rounded-lg' alt="Application" />
                    </div>
                </div>

                {/* Team and Vision Section */}
                <div className='flex flex-col-reverse md:flex-row gap-8 md:gap-14 mt-20 py-8 items-center w-full my-8  text-center md:text-left'>
                    <div className='w-full md:w-[40%]'>
                        <img src="/team.webp" alt="Our Team" className='w-4/5 md:w-full rounded-lg mx-auto' />
                    </div>

                    <div className='flex flex-col flex-1'>
                        <div className='border-b border-gray-300 pb-8'>
                            <h1 className='text-2xl md:text-4xl font-bold mb-4'>Our Team</h1>
                            <p className='text-gray-600'>
                                Our team is made up of talented individuals with diverse backgrounds and skill sets. From software developers to data scientists, we work together to create innovative solutions that drive results.
                            </p>
                        </div>

                        <div className='mt-12 border-b border-gray-300 pb-8'>
                            <h1 className='text-2xl md:text-4xl font-bold mb-4'>Our Vision</h1>
                            <p className='text-gray-600'>
                                Our vision is to revolutionize the way people interact with technology. By combining cutting-edge AI with intuitive design, we aim to simplify complex processes and enhance productivity across industries.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Offerings Section */}
                <div className='text-center bg-[#e7effe] rounded-lg w-[100%] md:w-fit mx-auto p-3 md:p-8 my-12'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-1'>What We Offer</h2>
                    <p className='mb-6 text-gray-600'>Our portal hosts a wide range of AI-powered tools, including but not limited to:</p>
                    <ul className='list-disc list-inside text-left mx-auto max-w-[800px] flex flex-col gap-2'>
                        <li><strong>Productivity Boosters:</strong> Streamline your workflows with tools that automate repetitive tasks.</li>
                        <li><strong>Financial Calculators:</strong> Plan smarter with tools designed for accurate and insightful financial decisions.</li>
                        <li><strong>Creative Assistance:</strong> Generate content, enhance visuals, and explore new creative possibilities with AI.</li>
                        <li><strong>Business Enhancers:</strong> Leverage tools tailored for branding, marketing, and customer engagement.</li>
                    </ul>
                </div>
            </div>

            {/* Footer Section */}
            <div className='bg-mainPurple text-white text-center py-10 px-4'>
                <h1 className='text-3xl md:text-5xl font-bold mb-6'>Join Us on Our Journey</h1>
                <p>Copyright Maverick @2024</p>
            </div>
        </div>
    );
}

export default AboutUs;
