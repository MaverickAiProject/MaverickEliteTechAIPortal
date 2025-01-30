import React from 'react';

function AiToolCard({ handleOpenToolPage, cardImage, cardTitle, cardText }) {
    return (
        <div onClick={handleOpenToolPage} className="bg-whiteCard p-4 rounded-md shadow-sm transition-transform ease-in-out duration-[0.25s] relative hover:shadow-md hover:scale-105 active:scale-90 cursor-pointer">
            <img src={cardImage} alt="" className="h-11 mb-3" />
            <h2 className="font-semibold text-lg text-textColor">{cardTitle}</h2>
            <p className='text-greyText'>{cardText}</p>
        </div>
    );
}

export default AiToolCard;
