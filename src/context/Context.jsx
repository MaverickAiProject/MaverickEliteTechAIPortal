import { createContext, useEffect, useState } from "react";
import { runSpecial } from "../config/geminiAPI";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";


export const Context = createContext();

const ContextProvider = (props) => {
    // User Data
    const [status, setStatus] = useState(null);
    const userD = auth.currentUser;
    const [userDetails, setUserDetails] = useState("");

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("User not logged in");
                }
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const checkVerification = async () => {
            if (userD) {
                await userD.reload();
                if (userD.emailVerified) {
                    setStatus("Verified");
                } else {
                    setStatus("Not Verified");
                }
            }
        };
        checkVerification();
    }, [userD]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("Logout successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    })


    // AI Part
    const [loading, setLoading] = useState(false);
    const [inputTopic, setInputTopic] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [aiPrompt, setAiPrompt] = useState('')
    const [result, setResult] = useState('')

    // Credits
    const [credits, setCredits] = useState(630);
    const [maxLimit, setMaxLimit] = useState(1000);

    const generateContent = async () => {
        setLoading(true)
        const result = await runSpecial(aiPrompt, inputTopic, inputDescription);
        setResult(result)
        setLoading(false)
        setInputTopic('')
        setInputDescription('')
    }

    const contextValue = {
        userDetails, status, handleLogout, user,
        loading, setLoading,
        inputTopic, setInputTopic,
        inputDescription, setInputDescription,
        result, setResult,
        generateContent,
        setAiPrompt,
        credits, setCredits,
        maxLimit, setMaxLimit
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;