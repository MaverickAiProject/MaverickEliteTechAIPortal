import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { images } from "../assets/images.js";
import ReactLoading from 'react-loading';
import { Context } from "../context/Context.jsx";
import LogoVideo from "../components/LogoVideo.jsx";
import PolicyLinks from "../components/PolicyLinks.jsx";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const [verificationStatus, setVerificationStatus] = useState(false);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { setAuthorizedUser, newUser, setNewUser, fetchUserData } = useContext(Context)

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // Phone number checking
            const q = query(collection(db, "Users"), where("number", "==", number));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("This phone number is already registered.");
                setLoading(false)
                return;
            }

            // If phone number validation done - User login
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            const user = auth.currentUser;

            // Set Initial User Data
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    name: name,
                    number: number,
                    credits: 1000,
                    maxLimit: 1000
                });
                setLoading(false)
            }
            setNewUser(user)

        } catch (err) {
            setError(err.message);
            console.log(err)
            setLoading(false)
        }
    };


    useEffect(() => {
        if (newUser) {
            const interval = setInterval(async () => {
                await newUser.reload();
                if (newUser.emailVerified) {
                    setVerificationStatus(true);
                    clearInterval(interval);
                    fetchUserData(newUser)
                    setAuthorizedUser(newUser);
                    console.log('signup = ' + newUser)
                    navigate('/');
                }
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [newUser]);

    const handleEmailChange = () => {
        const confirmation = confirm("Are you sure you want to use another email?");
        if (confirmation) {
            setNewUser(null);
        };
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-dashboardBg ">
            {!newUser
                &&
                <div className="w-[90%] text-textColor max-w-lg border-gray-400 border py-4 px-4 sm:px-8 bg-whiteCard shadow-md rounded-md">
                    <div>
                        <div className="w-44 sm:w-44 mx-auto mb-3">
                            <LogoVideo />
                        </div>
                        <h1 className="text-2xl font-bold text-purpleText text-center">
                            Create New Account
                        </h1>
                        <p className="text-center mb-5">Deep dive into best AI Tools!</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className=" w-full px-4 py-2 border border-gray-400 bg-inputBg rounded focus:outline-none focus:ring-2 focus:ring-purpleText "
                        />
                        <input
                            type="number"
                            min="1000000000"
                            max="9999999999"
                            placeholder="Enter Your Phone Number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                            className=" w-full px-4 py-2 border border-gray-400 bg-inputBg rounded focus:outline-none focus:ring-2 focus:ring-purpleText "
                        />
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className=" w-full px-4 py-2 border border-gray-400 bg-inputBg rounded focus:outline-none focus:ring-2 focus:ring-purpleText "
                        />
                        <input
                            type="password"
                            placeholder="Set Password"
                            value={password}
                            minLength="8"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className=" w-full px-4 py-2 border border-gray-400 bg-inputBg rounded focus:outline-none focus:ring-2 focus:ring-purpleText "
                        />
                        <div className="flex items-start space-x-2 mt-4">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="w-4 h-4 mt-1 text-purpleText accent-purpleText "
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-greyText"
                            >
                                I hereby declare that the email and phone number I have provided are true and authentic. I also agree to the <Link to={'/t&c'} className="text-purpleText underline">Terms & Conditions</Link>  and <Link to={'/privacyPolicy'} className="text-purpleText underline"> Privacy Policy</Link> of Maverick AI Portal.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-mainPurple text-white font-bold rounded hover:bg-mainPurpleDark transition duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-light text-center flex items-center justify-center"
                        >
                            {loading ?
                                <ReactLoading type={"bars"} color={"white"} height={'30px'} width={'30px'} />
                                : 'Signup'
                            }
                        </button>
                    </form>

                    <div className="text-center mt-2">
                        <p>Already have an account?{" "}
                            <Link to={'/login'} className="text-purpleText   font-semibold">
                                Login here
                            </Link>
                        </p>
                    </div>
                    {error && (
                        <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
                            {error}
                        </p>
                    )}
                    <PolicyLinks />
                </div>
            }
            {newUser && !verificationStatus &&
                <div className="w-full max-w-md p-8 bg-whiteCard shadow-md rounded-md flex flex-col gap-4 ">
                    <div className="w-44 sm:w-44 mx-auto mb-3">
                        <LogoVideo />
                    </div>
                    <h1 className="text-2xl font-bold text-purpleText text-center">
                        Verify your Email
                    </h1>
                    <p className="text-center text-textColor mb-5">{`We have sent you a verification mail at ${newUser.email} . Open your Email Inbox and click on the link to verify your email.`}</p>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-mainPurple text-white font-bold rounded hover:bg-mainPurpleDark transition duration-300 text-center flex items-center justify-center"
                        onClick={handleEmailChange}
                    >
                        Want to use another email? Click here.
                    </button>
                </div>
            }
        </div>
    );
}

export default Signup;
