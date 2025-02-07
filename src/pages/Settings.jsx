import React, { useContext } from "react";
import ContentContainer from "../components/ContentContainer";
import GradientBox from "../components/GradientBox";
import GradientInnerTitle from "../components/GradientInnerTitle";
import { images } from "../assets/images";
import { Context } from "../context/Context";

function Settings() {
    const { handleLogout, userDetails, authorizedUser } = useContext(Context);

    return (
        <ContentContainer>
            <GradientBox>
                <GradientInnerTitle
                    icon={images.profile_logo}
                    title={"Welcome to Your Profile"}
                    description={"View and manage your account details, status, and other information."}
                />
            </GradientBox>
            <div className='py-3 sm:py-5 h-[calc(100vh-5px)] md:h-auto '>
                <div className="bg-whiteCard rounded-md w-[100%] lg:w-2/5 mx-auto p-6 shadow-md">
                    <h1 className="text-2xl font-bold text-purpleText mb-4">User Details</h1>
                    <div className="space-y-4">
                        <p className="text-lg text-textColor">
                            <span className="font-semibold">Name:</span> {userDetails?.name || "N/A"}
                        </p>
                        <p className="text-lg text-textColor">
                            <span className="font-semibold">Email:</span> {userDetails?.email || "N/A"}
                        </p>
                        <p className="text-lg text-textColor">
                            <span className="font-semibold">Phone Number:</span> {userDetails?.number || "N/A"}
                        </p>
                        <p className="text-lg text-textColor">
                            <span className="font-semibold">Verification Status:</span> {authorizedUser?.emailVerified ? "Verified" : "Not Verified"}
                        </p>
                    </div>
                    <button
                        onClick={() => handleLogout()}
                        className="mt-6 px-6 py-2 bg-mainPurple text-activeText font-semibold rounded-md shadow hover:bg-mainPurpleDark"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </ContentContainer>
    );
}

export default Settings;
