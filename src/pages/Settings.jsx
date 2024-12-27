import React, { useContext } from "react";
import ContentContainer from "../components/ContentContainer";
import GradientBox from "../components/GradientBox";
import GradientInnerTitle from "../components/GradientInnerTitle";
import { images } from "../assets/images";
import { Context } from "../context/Context";

function Settings() {
    const { handleLogout, userDetails, authorizedUser } = useContext(Context);
    console.log(userDetails)

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={images.profile_logo}
                    title={"Welcome to Your Profile"}
                    description={"View and manage your account details, status, and other information."}
                />
            </GradientBox>

            <div className="bg-white dark:bg-dark-grayCard rounded-md w-[90%] lg:w-2/5 mx-auto p-6 mt-6 shadow-md">
                <h1 className="text-2xl font-bold text-primary dark:text-dark-primary mb-4">User Details</h1>
                <div className="space-y-4">
                    <p className="text-lg text-gray-800 dark:text-dark-textPrimary">
                        <span className="font-semibold">Name:</span> {userDetails?.name || "N/A"}
                    </p>
                    <p className="text-lg text-gray-800 dark:text-dark-textPrimary">
                        <span className="font-semibold">Email:</span> {userDetails?.email || "N/A"}
                    </p>
                    <p className="text-lg text-gray-800 dark:text-dark-textPrimary">
                        <span className="font-semibold">Phone Number:</span> {userDetails?.number || "N/A"}
                    </p>
                    <p className="text-lg text-gray-800 dark:text-dark-textPrimary">
                        <span className="font-semibold">Verification Status:</span> {authorizedUser?.emailVerified ? "Verified" : "Not Verified"}
                    </p>
                </div>
                <button
                    onClick={() => handleLogout()}
                    className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-primary-dark dark:bg-dark-primary dark:hover:bg-dark-primary-light"
                >
                    Logout
                </button>
            </div>
        </ContentContainer>
    );
}

export default Settings;
