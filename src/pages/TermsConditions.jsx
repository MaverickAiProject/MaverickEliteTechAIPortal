import React from 'react';

function TermsConditions() {
    return (
        <div id="main-outer-container">
            {/* Header Section */}
            <div className="bg-mainPurple text-white text-center py-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
                <p className="text-sm md:text-md max-w-[90%] md:max-w-[600px] mx-auto">
                    Please read these terms and conditions carefully before using our website.
                </p>
            </div>

            {/* Main Content */}
            <div id="main-inner" className="w-[90%] max-w-[1200px] mx-auto my-12 text-gray-800 space-y-8">
                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                    <p>
                        Welcome to Maverick AI Tools. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
                        If you disagree with any part of these terms, please do not use our website.
                    </p>
                </section>

                {/* Use of Website */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Use of Website</h2>
                    <p>By using our website, you agree to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>Use the website for lawful purposes only.</li>
                        <li>Provide accurate and truthful information when required.</li>
                        <li>Not attempt to interfere with the website’s security or functionality.</li>
                    </ul>
                </section>

                {/* Intellectual Property */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                    <p>
                        All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Maverick AI Tools or
                        its content suppliers and is protected by applicable copyright, trademark, and other intellectual property laws.
                    </p>
                </section>

                {/* Limitation of Liability */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                    <p>
                        Maverick AI Tools shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of,
                        or inability to use, our website. We make no guarantees regarding the accuracy or reliability of the content provided on our platform.
                    </p>
                </section>

                {/* User Accounts */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
                    <p>
                        If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials. Any activity under
                        your account is your responsibility. Notify us immediately if you suspect unauthorized use of your account.
                    </p>
                </section>

                {/* Third-Party Links */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these third-party
                        websites. Accessing these links is at your own risk.
                    </p>
                </section>

                {/* Termination */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Termination</h2>
                    <p>
                        We reserve the right to terminate or suspend your access to our website without prior notice if we determine that you have violated these terms
                        and conditions or engaged in any unlawful activity.
                    </p>
                </section>

                {/* Governing Law */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                    <p>
                        These terms and conditions are governed by the laws of India. Any disputes arising from the use of our website will be subject to
                        the jurisdiction of the courts in India.
                    </p>
                </section>

                {/* Changes to Terms */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                    <p>
                        We reserve the right to update or modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of
                        the website signifies your acceptance of the updated terms.
                    </p>
                </section>

                {/* Contact Us */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p>
                        If you have any questions about these terms and conditions, please contact us:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>Email: <a href="mailto:maverick.aiproject@gmail.com" className="text-primary font-semibold">maverick.aiproject@gmail.com</a></li>
                    </ul>
                </section>
            </div>

            {/* Footer Section */}
            <div className="bg-mainPurple text-white text-center py-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">Thank You for Trusting Us</h1>
                <p>Copyright Maverick AI Tools &copy; 2024</p>
            </div>
        </div>
    );
}

export default TermsConditions;
