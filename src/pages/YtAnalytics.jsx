import React, { useState } from 'react'
import ContentContainer from '../components/ContentContainer'
import GradientBox from '../components/GradientBox'
import GradientInnerTitle from '../components/GradientInnerTitle'
import { TOOLS_IMAGES } from '../assets/images'
import ChannelList from '../components/youtube analytics/ChannelList'
import SearchForm from '../components/youtube analytics/SearchForm'
import axios from 'axios';

function YtAnalytics() {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(channels)

    const fetchChannels = async (filters) => {
        setLoading(true);
        try {

            // Fetch channel Ids
            const API_KEY = 'AIzaSyDc9ItK1_q4xXQsxA2VkiwVwlR95UpN7TA';
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    type: 'channel',
                    q: filters.channelName || '',
                    regionCode: filters.country || 'IN',
                    order: 'relevance',
                    maxResults: 50,
                    key: API_KEY,
                },
            }
            );

            const channelIds = response.data.items.map((item) => item.id.channelId).join(',');

            // Fetch detailed stats for each channel
            const statsResponse = await axios.get(
                `https://www.googleapis.com/youtube/v3/channels`, {
                params: {
                    part: 'snippet,statistics',
                    id: channelIds,
                    key: API_KEY,
                },
            }
            );
            console.log(statsResponse)

            // Filter channels based on the form inputs
            const filteredChannels = statsResponse.data.items.filter((channel) => {
                const stats = channel.statistics;

                // Convert API stats to numbers
                const subscriberCount = parseInt(stats.subscriberCount || "0", 10);
                const viewCount = parseInt(stats.viewCount || "0", 10);
                const videoCount = parseInt(stats.videoCount || "0", 10);

                // Convert filters to numbers
                const minSubscribers = filters.minSubscribers ? parseInt(filters.minSubscribers, 10) : undefined;
                const minViews = filters.minViews ? parseInt(filters.minViews, 10) : undefined;
                const minVideos = filters.minVideos ? parseInt(filters.minVideos, 10) : undefined;

                // Apply filters
                return (
                    (!minSubscribers || subscriberCount >= minSubscribers) &&
                    (!minViews || viewCount >= minViews) &&
                    (!minVideos || videoCount >= minVideos)
                );
            });

            setChannels(filteredChannels);
        } catch (error) {
            console.error('Error fetching channels:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={TOOLS_IMAGES.youtube_videos_ideas}
                    title={"Youtube Analytics"}
                    description={"Get Youtube Analytics using AI"}
                />
            </GradientBox>
            <div className='py-3 sm:py-4'>
                <SearchForm onSearch={fetchChannels} />
                <ChannelList channels={channels} loading={loading} />
            </div>
        </ContentContainer>

    )
}

export default YtAnalytics