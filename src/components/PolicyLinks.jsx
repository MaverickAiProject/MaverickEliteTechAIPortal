import React from 'react'
import { Link } from "react-router-dom";

function PolicyLinks() {

    const LINKS = [
        {
            name: 'About Us',
            link: '/aboutUs'
        },
        {
            name: 'Contact Us',
            link: '/contactUs'
        },
        {
            name: 'Terms and Conditions',
            link: '/t&c'
        },
        {
            name: 'Privacy Policy',
            link: '/privacyPolicy'
        },
        {
            name: 'Refund Policy',
            link: '/refundPolicy'
        },
    ]

    return (
        <div className="text-sm text-greyText flex gap-4 w-[90%] mx-auto flex-wrap items-center justify-center mt-4 border-t border-greyText pt-3">
            {LINKS.map((item, index) =>
                <Link key={index} to={item.link} className="hover:text-purpleText border-b hover:border-purpleText border-transparent ease-in-out duration-300 transition-all">{item.name}</Link>
            )}
        </div>
    )
}

export default PolicyLinks;