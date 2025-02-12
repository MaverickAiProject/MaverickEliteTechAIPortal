import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [newUser, setNewUser] = useState()
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const [userDetails, setUserDetails] = useState("");

    const fetchUserData = async (user) => {
        if (!user) {
            setUserDetails("User details not found");
            return;
        }

        try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            } else {
                console.log("User data does not exist.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Monitor Firebase authentication state changes
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user?.emailVerified === false) {
                setNewUser(user)
                setAuthorizedUser(null)
            } else {
                setAuthorizedUser(user);
                fetchUserData(user);
            }
        });

    }, []);

    console.log(auth.currentUser)

    // sign in with google
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            const user = auth.currentUser;

            // Check if user document exists in Firestore
            const userDocRef = doc(db, "Users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    name: user.displayName,
                    credits: 1000,
                    maxLimit: 1000,
                });
            }

        } catch (error) {
            console.error("Error during Google sign-in", error);
            toast.error("Error sign-in with Google. Please try again.");
        }
    };

    // sign in with facebook
    // const handleSignInWithFacebook = async () => {
    //     try {
    //         await signInWithPopup(auth, new FacebookAuthProvider());
    //         const user = auth.currentUser;

    //         const userDocRef = doc(db, "Users", user.uid);
    //         const userDocSnap = await getDoc(userDocRef);

    //         if (!userDocSnap.exists()) {
    //             await setDoc(userDocRef, {
    //                 email: user.email,
    //                 name: user.displayName,
    //                 credits: 1000,
    //                 maxLimit: 1000,
    //             });
    //         }

    //         console.log("Facebook sign-in successful:", user);

    //     } catch (error) {
    //         console.error("Error during Facebook sign-in", error);
    //     }
    // };

    // Handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("Logout successfully");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return <AuthContext.Provider
        value={{
            handleSignInWithGoogle,
            // handleSignInWithFacebook,
            handleLogout,
            setAuthorizedUser,
            newUser,
            setNewUser,
            fetchUserData,
            authorizedUser,
            userDetails,
            setUserDetails
        }}
    >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);