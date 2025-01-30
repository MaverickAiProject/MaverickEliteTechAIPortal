import React from 'react';
import GradientBox from '../components/GradientBox';
import ContentContainer from '../components/ContentContainer';

function PoliciesPage() {
    const INFO_CARDS = [
        {
            title: "About Us",
            description: "Learn more about our mission, vision, and the team behind Maverick AI Tools.",
            icon: "/request.png",
            redirectTo: "/aboutUs",
        },
        {
            title: "Contact Us",
            description: "Get in touch with us for any questions, queries, or feedback.",
            icon: "/contact.png",
            redirectTo: "/contactUs",
        },
        {
            title: "Terms & Conditions",
            description: "Read our terms and conditions for using our platform and AI tools.",
            icon: "/terms-conditions.png",
            redirectTo: "/t&c",
        },
        {
            title: "Privacy Policy",
            description: "Understand how we handle your data and maintain your privacy.",
            icon: "/locked.png",
            redirectTo: "/privacyPolicy",
        },
        {
            title: "Refund Policy",
            description: "Review our refund policy for payments and credits purchased on our platform.",
            icon: "/refund-policy.png",
            redirectTo: "/refundPolicy",
        },
    ];

    return (
        <ContentContainer>
            <GradientBox>
                <h1 className="font-semibold text-3xl">Our Policies</h1>
            </GradientBox>
            <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 justify-center md:justify-start">
                {INFO_CARDS.map((card, index) => (
                    <div
                        key={index}
                        className="w-full bg-whiteCard text-textColor shadow-md ease-in-out bottom-0 transform hover:bottom-2 rounded-lg p-4 hover:shadow-lg duration-200 cursor-pointer transition-all relative"
                        onClick={() => window.open(card.redirectTo, "_blank")}
                    >
                        <img
                            src={card.icon}
                            alt={`${card.title} icon`}
                            className="w-16 h-16 mx-auto mb-4"
                        />
                        <h2 className="text-lg font-bold text-center mb-2">{card.title}</h2>
                        <p className="text-sm text-greyText text-center">{card.description}</p>
                    </div>
                ))}
            </div>
        </ContentContainer>
    );
}

export default PoliciesPage;
