import React from 'react';
import GradientBox from '../components/GradientBox';
import { useNavigate } from 'react-router-dom';
import ContentContainer from '../components/ContentContainer';


function PoliciesPage() {
    const INFO_CARDS = [
        {
            title: "About Us",
            description: "Learn more about our mission, vision, and the team behind Maverick AI Tools.",
            icon: "/request.png", // Replace with your desired image path
            redirectTo: "/aboutUs",
        },
        {
            title: "Contact Us",
            description: "Get in touch with us for any questions, queries, or feedback.",
            icon: "/contact.png", // Replace with your desired image path
            redirectTo: "/contactUs",
        },
        {
            title: "Terms & Conditions",
            description: "Read our terms and conditions for using our platform and AI tools.",
            icon: "/terms-conditions.png", // Replace with your desired image path
            redirectTo: "/t&c",
        },
        {
            title: "Privacy Policy",
            description: "Understand how we handle your data and maintain your privacy.",
            icon: "/locked.png", // Replace with your desired image path
            redirectTo: "/privacyPolicy",
        },
        {
            title: "Refund Policy",
            description: "Review our refund policy for payments and credits purchased on our platform.",
            icon: "/refund-policy.png", // Replace with your desired image path
            redirectTo: "/refundPolicy",
        },
    ];

    // const navigate = useNavigate();

    return (
        <ContentContainer>
            <GradientBox>
                <h1 className="font-semibold text-3xl">Our Policies</h1>
            </GradientBox>
            <div className="p-5 flex flex-wrap gap-4 justify-center md:justify-start">
                {INFO_CARDS.map((card, index) => (
                    <div
                        key={index}
                        className="w-full sm:max-w-[250px] bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                        onClick={() => window.open(card.redirectTo, "_blank")}
                    >
                        <img
                            src={card.icon}
                            alt={`${card.title} icon`}
                            className="w-16 h-16 mx-auto mb-4"
                        />
                        <h2 className="text-lg font-bold text-center mb-2">{card.title}</h2>
                        <p className="text-sm text-gray-600 text-center">{card.description}</p>
                    </div>
                ))}
            </div>
        </ContentContainer>
    );
}

export default PoliciesPage;
