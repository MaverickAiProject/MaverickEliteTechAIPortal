import React from 'react';
import { useForm } from 'react-hook-form';
import { Countries_With_Region_Codes, minMaxValues } from '../../utils/youtubeAnalyticsData';

const SearchForm = ({ onSearch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Send form data on search
        onSearch(data);
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-100 rounded">
            <div className="grid grid-cols-2 gap-4">
                {/* Channel Name */}
                <div>
                    <label htmlFor="channelName" className="block mb-2 text-lg font-medium text-gray-700">
                        Channel Name
                    </label>
                    <input
                        id='channelName'
                        type="text"
                        placeholder="Channel Name"
                        {...register("channelName")}
                        className="p-2 border rounded w-full"
                    />
                </div>
                {/* Country or region */}
                <div>
                    <label htmlFor="country" className="block mb-2 text-lg font-medium text-gray-700">
                        Country
                    </label>
                    <select
                        id="country"
                        {...register("country")}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select an option</option>
                        {Countries_With_Region_Codes.map((option) => (
                            <option key={option.name} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Min Subscribers */}
                <div className="">
                    <label htmlFor="minSubscribers" className="block mb-2 text-lg font-medium text-gray-700">
                        Minimum Subscribers
                    </label>
                    <select
                        id="minSubscribers"
                        {...register("minSubscribers")}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select an option</option>
                        {minMaxValues.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Minimum Views */}
                <div>
                    <label htmlFor="minViews" className="block mb-2 text-lg font-medium text-gray-700">
                        Minimum Views
                    </label>
                    <select
                        id="minViews"
                        {...register("minViews")}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Select an option</option>
                        {minMaxValues.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Min Videos */}
                <div className="">
                    <label htmlFor="minVideos" className="block mb-2 text-lg font-medium text-gray-700">
                        Minimum Videos Uploaded
                    </label>
                    <input
                        id="minVideos"
                        type="number"
                        name="minVideos"
                        placeholder="Min Videos"
                        {...register("minVideos")}
                        className="p-2 border rounded w-full"
                    />
                </div>

            </div>
            <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm;
