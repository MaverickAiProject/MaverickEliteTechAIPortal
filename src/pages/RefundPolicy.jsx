import React from 'react';

function RefundPolicy() {
    return (
        <div id="main-outer-container">
            {/* Header Section */}
            <div className="bg-primary text-white text-center py-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Refund Policy</h1>
                <p className="text-sm md:text-md max-w-[90%] md:max-w-[600px] mx-auto">
                    Please review our refund policy carefully before making any purchases on our platform.
                </p>
            </div>

            {/* Main Content */}
            <div id="main-inner" className="w-[90%] max-w-[1200px] mx-auto my-12 text-gray-800 space-y-8">
                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                    <p>
                        At Maverick AI Tools, we strive to provide a seamless experience with our AI-powered tools and services.
                        This refund policy outlines the terms and conditions regarding payments and refunds for credits purchased on our platform.
                    </p>
                </section>

                {/* Free Credits */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Free Credits</h2>
                    <p>
                        When you register on our platform for the first time, you will be credited with <strong>1000 free credits</strong>.
                        These credits can be used to access and explore our AI tools. Each tool usage deducts <strong>50 credits per call</strong>.
                        These free credits are provided as a one-time offer and cannot be replenished or refunded.
                    </p>
                </section>

                {/* Purchasing Credits */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Purchasing Credits</h2>
                    <p>
                        If your credits run low, you can purchase additional credits from the billing section in your account. We offer various packages to suit your requirements.
                        Upon selecting a package, you will be redirected to the payment gateway for secure payment processing.
                    </p>
                </section>

                {/* Cancellation Policy */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
                    <p>
                        You may cancel the payment process at any time before completing the transaction on the payment gateway.
                        No charges will be applied for cancelled payments. However, once the payment is successfully processed,
                        it cannot be cancelled or refunded.
                    </p>
                </section>

                {/* Refund Policy */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
                    <p>
                        Please note that <strong>all payments made on our platform are non-refundable</strong>.
                        Once the payment is successfully completed, the respective credits will be instantly added to your account,
                        and no refund requests will be entertained. We encourage users to carefully review their selected packages before proceeding with payment.
                    </p>
                </section>

                {/* Support */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Support</h2>
                    <p>
                        If you experience any issues with your payment or credits, please contact our support team. We are committed to resolving any concerns
                        or discrepancies related to your account or transactions promptly.
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>Email: <a href="mailto:support@maverickai.com" className="text-primary font-semibold">maverick.aiproject@gmail.com</a></li>
                    </ul>
                </section>
            </div>

            {/* Footer Section */}
            <div className="bg-primary text-white text-center py-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">Thank You for Using Maverick AI Tools</h1>
                <p>Copyright Maverick AI Tools &copy; 2024</p>
            </div>
        </div>
    );
}

export default RefundPolicy;
