import React from 'react';

const ChannelCard = ({ channel }) => {
    const { snippet, statistics } = channel;

    return (
        <a
            className="p-4 border bg-white flex items-center flex-col rounded-lg shadow cursor-pointer hover:shadow-lg ease-in-out transform duration-300 hover:bottom-2 relative bottom-0"
            href={`https://www.youtube.com/${snippet.customUrl ? snippet.customUrl : `results?search_query=${snippet.title}`}`} target='_blank'
        >
            <img src={snippet.thumbnails.default.url ? snippet.thumbnails.default.url : snippet.thumbnails.high.url} alt={snippet.title} className="mb-3 rounded-lg w-full" />
            <h2 className="text-lg text-center font-bold">{snippet.title}</h2>
            <p>Subscribers: {statistics.subscriberCount}</p>
            <p>Views: {statistics.viewCount}</p>
            <p>Videos: {statistics.videoCount}</p>
        </a>
    );
};

export default ChannelCard;
