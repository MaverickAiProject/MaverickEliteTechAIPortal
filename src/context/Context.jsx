import { createContext, useEffect, useState } from "react";
import { runSpecial } from "../config/geminiAPI";
import { auth, db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const Context = createContext();

const ContextProvider = (props) => {

    const [newUser, setNewUser] = useState()
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const [userDetails, setUserDetails] = useState("");

    // Fetch user details from Firestore

    const fetchUserData = async (user) => {
        if (!user) {
            setUserDetails("User not found");
            return;
        }

        try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            } else {
                console.log("User data does not exist in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Monitor Firebase authentication state changes
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log(user)
            if (user?.emailVerified === false) {
                setNewUser(user)
                navigate('/signup')
                setAuthorizedUser(null)
            } else {
                setAuthorizedUser(user);
                fetchUserData(user);
            }
        });

    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("Logout successfully");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // AI-related state and functionality
    const [loading, setLoading] = useState(false);
    const [inputTopic, setInputTopic] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [aiPrompt, setAiPrompt] = useState("");
    const [result, setResult] = useState("");

    // Credits management
    const [credits, setCredits] = useState();
    const [maxLimit, setMaxLimit] = useState(1000);

    useEffect(() => {
        setCredits(userDetails.credits)
    }, [userDetails])

    // Generate AI content
    const generateContent = async () => {
        setLoading(true);
        try {
            const result = await runSpecial(aiPrompt, inputTopic, inputDescription);
            setResult(result);
        } catch (error) {
            console.error("Error generating content:", error);
        } finally {
            setLoading(false);
            setInputTopic("");
            setInputDescription("");
        }
    };


    // Deduct credits from Firestore
    const deductCredits = async (amount) => {
        if (!authorizedUser) {
            console.error("No user is logged in.");
            return;
        }

        const userDocRef = doc(db, "Users", authorizedUser.uid);

        try {
            const currentCredits = credits || userDetails.credits;

            if (currentCredits < amount) {
                throw new Error("Insufficient credits.");
            }

            const newCredits = currentCredits - amount;

            // Update Firestore
            await updateDoc(userDocRef, { credits: newCredits });

            // Update local state
            setCredits(newCredits);
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                credits: newCredits,
            }));

        } catch (error) {
            console.error("Error deducting credits:", error);
        }
    };


    const contextValue = {
        userDetails,
        handleLogout,
        authorizedUser,
        setAuthorizedUser,
        fetchUserData,
        newUser, setNewUser,
        loading,
        setLoading,
        inputTopic,
        setInputTopic,
        inputDescription,
        setInputDescription,
        result,
        setResult,
        generateContent,
        setAiPrompt,
        credits,
        setCredits,
        maxLimit,
        setMaxLimit,
        deductCredits
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
