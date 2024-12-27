import React, { useContext } from "react";
import { Context } from "../context/Context";

function CreditProgressBar() {
    const { credits, maxLimit } = useContext(Context);

    const progressPercentage = Math.min((credits / maxLimit) * 100, 100);

    return (
        <div className="max-w-lg mx-auto">
            <div className="relative w-full h-[5px] bg-gray-200 rounded-lg overflow-hidden">
                <div
                    style={{ width: `${progressPercentage}%` }}
                    className="h-full rounded-full bg-primary transition-all duration-300"
                ></div>
            </div>
        </div>
    );
}

export default CreditProgressBar;
