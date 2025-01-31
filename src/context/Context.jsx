import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export const Context = createContext();

const ContextProvider = (props) => {

    // nav open state
    const [navOpen, setNavOpen] = useState(false)

    // Error Toast Message
    const handleError = (message) => {
        toast.error(message)
    }

    // User Realted States
    const [newUser, setNewUser] = useState()
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const [userDetails, setUserDetails] = useState("");

    // Fetch user details from Firestore
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
                console.log("User data does not exist in Firestore.");
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

    // Handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("Logout successfully");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // Credits management
    const [credits, setCredits] = useState();
    const [maxLimit, setMaxLimit] = useState();

    // Check Credits
    const checkCredits = async (amount) => {
        if (!authorizedUser) {
            toast.error("User not signed in!")
            return;
        }
        try {
            const userDocRef = doc(db, "Users", authorizedUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                toast.error("User data not found!");
                return false;
            }

            const currentCredits = userDocSnap.data().credits;
            setCredits(currentCredits);

            if (currentCredits < amount) {
                toast.error("Insufficient credits... Buy more credits to continue.");
                return false;
            }

            return true;

        } catch (err) {
            toast.error("Error:" + err)
            return false;
        }

    };

    // Deduct credits from Firestore
    const deductCredits = async (amount) => {
        try {
            const newCredits = credits - amount;

            // Update Firestore
            const userDocRef = doc(db, "Users", authorizedUser.uid);
            await updateDoc(userDocRef, { credits: newCredits });

            // Update local state
            setCredits(newCredits);

            setUserDetails((prevDetails) => ({
                ...prevDetails,
                credits: newCredits,
            }));

        } catch (error) {
            toast.error("Error deducting credits:", error)
            console.error("Error deducting credits:", error);
        }
    };

    useEffect(() => {
        setCredits(userDetails.credits)
        setMaxLimit(userDetails.maxLimit)
    }, [userDetails])


    // Payment 
    const [cartItems, setCartItems] = useState()
    const [amount, setAmount] = useState()

    const buyNow = () => {
        const options = {
            key: "rzp_live_fD7GzfsSLYcwhn",
            amount: amount * 100,
            currency: "INR",
            name: "Maverick AI Portal",
            description: "Purchase Credits",
            handler: async (response) => {
                const paymentId = response.razorpay_payment_id;
                try {
                    const userDocRef = doc(db, "Users", authorizedUser.uid);

                    // Update Firestore with the purchased credits
                    await updateDoc(userDocRef, {
                        credits: credits + cartItems,
                        maxLimit: credits + cartItems
                    });
                    fetchUserData(authorizedUser)
                    toast.success("Payment successful. Credits added successfully.")
                    setAmount(0);
                    setCartItems(0);

                } catch (error) {
                    console.error("Error updating credits:", error);
                }
            },
            theme: {
                color: "#5f13c5",
            },
            modal: {
                ondismiss: () => {
                    console.log("Payment popup closed.");
                    toast.error("Payment unsuccessfull.")
                    setAmount(0);
                    setCartItems(0);
                },
            },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", (response) => {
            console.error("Payment failed:", response.error);
            alert("Payment failed. Please try again.");
        });

        rzp.open();
    };

    const handleBuyCredits = (val) => {
        if (val === 50) {
            setAmount(50);
            setCartItems(500);
        } else if (val === 85) {
            setAmount(85);
            setCartItems(1000);
        } else if (val === 170) {
            setAmount(170);
            setCartItems(2000);
        } else if (val === 420) {
            setAmount(420);
            setCartItems(5000);
        } else {
            return;
        }
    };

    useEffect(() => {
        if (amount && cartItems) {
            buyNow();
        }
    }, [amount, cartItems]);

    const contextValue = {
        navOpen, setNavOpen,
        // User related
        userDetails,
        handleLogout,
        authorizedUser,
        setAuthorizedUser,
        fetchUserData,
        newUser, setNewUser,
        // credits
        credits,
        setCredits,
        maxLimit,
        setMaxLimit,
        checkCredits,
        deductCredits,
        // Buy credits
        buyNow,
        handleBuyCredits
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;