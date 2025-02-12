import React from "react";
import { motion } from "framer-motion";
import { images } from "../../assets/images";

function AuthMain({ children }) {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-[90%] mx-auto text-textColor max-w-lg py-4 md:px-4 sm:px-8"
        >

            <div className="max-w-48 mx-auto mb-4">
                <img src={images.newLogo} alt="newLogo" />
            </div>
            <div>{children}</div>
        </motion.div>
    );
}

export default AuthMain;
