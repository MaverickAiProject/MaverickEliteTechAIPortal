import React from 'react';
import ChannelCard from './ChannelCard';

const ChannelList = ({ channels, loading }) => {
    if (loading) {
        return <p>Loading channels...</p>;
    }

    if (channels.length === 0) {
        return <p>No channels found!</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {channels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
            ))}
        </div>
    );
};

export default ChannelList;
