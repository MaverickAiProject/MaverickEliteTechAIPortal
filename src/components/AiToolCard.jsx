import React from 'react';

function AiToolCard({ handleOpenToolPage, cardImage, cardTitle, cardText, classes }) {
    return (
        <div
            onClick={handleOpenToolPage}
            className={`bg-whiteCard px-4 py-5 flex ${classes} flex-col items-center text-center rounded-md shadow-sm transition-all ease-in-out duration-[0.25s] relative hover:shadow-lg hover:bottom-1 bottom-0 active:scale-90 cursor-pointer`}
        >
            <img src={cardImage} alt="" className="h-12 sm:h-11 mb-3 " />
            <h2 className="font-semibold text-lg text-textColor mb-1">{cardTitle}</h2>
            <p className='text-greyText'>{cardText}</p>
        </div>
    );
}

export default AiToolCard;
