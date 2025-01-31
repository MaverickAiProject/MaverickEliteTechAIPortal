import React from 'react';

function PrivacyPolicy() {
    return (
        <div id="main-outer-container">
            {/* Header Section */}
            <div className="bg-mainPurple text-white text-center py-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-sm md:text-md max-w-[90%] md:max-w-[600px] mx-auto">
                    Learn about how we collect, use, and safeguard your data while using our services.
                </p>
            </div>

            {/* Main Content */}
            <div id="main-inner" className="w-[90%] max-w-[1200px] mx-auto my-12">
                <div className="text-gray-800 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p>
                            At Maverick AI Tools, your privacy is of utmost importance to us. This Privacy Policy outlines the types of
                            information we collect, how we use it, and the measures we take to protect it. By using our website, you agree
                            to the practices described in this policy.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <p>We may collect the following types of information when you use our services:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li><strong>Personal Information:</strong> Such as your name, email address, and contact details when you register or contact us.</li>
                            <li><strong>Usage Data:</strong> Information about your interactions with our website, including pages visited and tools used.</li>
                            <li><strong>Device Information:</strong> Details about the device you use to access our website, such as browser type and IP address.</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <p>Your data helps us improve your experience and deliver our services effectively. We use your information to:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Provide and maintain our tools and services.</li>
                            <li>Respond to your inquiries and provide customer support.</li>
                            <li>Analyze usage patterns to enhance our website’s functionality.</li>
                            <li>Send updates, promotional offers, or important notifications related to our services.</li>
                        </ul>
                    </section>

                    {/* Data Protection */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
                        <p>
                            We implement industry-standard security measures to safeguard your data. However, please note that no online platform is completely secure.
                            We recommend that you take precautions to protect your personal information when using the internet.
                        </p>
                    </section>

                    {/* Third-Party Sharing */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Third-Party Sharing</h2>
                        <p>
                            We do not sell or rent your personal information to third parties. We may share your data with trusted partners or service providers to
                            help us deliver our services, as long as they agree to adhere to strict confidentiality standards.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <p>
                            You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights,
                            please contact us at <a href="mailto:maverick.aiproject@gmail.com" className="text-primary font-semibold">maverick.aiproject@gmail.com</a>.
                        </p>
                    </section>

                    {/* Policy Updates */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be
                            posted on this page, and we encourage you to review it periodically.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy or our data practices, please reach out to us:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                            <li>Email: <a href="mailto:maverick.aiproject@gmail.com" className="text-primary font-semibold">maverick.aiproject@gmail.com</a></li>
                        </ul>
                    </section>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-mainPurple text-white text-center py-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">Your Privacy, Our Commitment</h1>
                <p>Copyright Maverick AI Tools &copy; 2024</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
