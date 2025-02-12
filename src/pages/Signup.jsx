import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import ReactLoading from 'react-loading';
import PolicyLinks from "../components/PolicyLinks.jsx";
import AuthOuter from "../components/auth/AuthOuter.jsx";
import AuthMain from "../components/auth/AuthMain.jsx";
import VerifyMailCard from "../components/auth/VerifyMailCard.jsx";
import ExternalProviders from "../components/auth/ExternalProviders.jsx";
import { useAuth } from "../context/AuthContext.jsx";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [verificationStatus, setVerificationStatus] = useState(false);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { setAuthorizedUser, newUser, setNewUser, fetchUserData } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            const user = auth.currentUser;

            // Set Initial User Data
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    name: name,
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
        <AuthOuter>
            {!newUser
                &&
                <AuthMain>
                    <h1 className="md:text-3xl text-2xl font-semibold text-gray-500 mb-8 text-center">
                        Create New Account
                    </h1>
                    <ExternalProviders />
                    <form onSubmit={handleSignup} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Set Password"
                            value={password}
                            minLength="8"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                        />
                        <p className="text-base text-greyText">By continuing you agree to AI Mavs's <Link to={'/t&c'} className="text-purpleText underline">Terms & Conditions</Link>  and <Link to={'/privacyPolicy'} className="text-purpleText underline"> Privacy Policy</Link></p>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-mainPurple text-white font-bold rounded-xl text-xl hover:bg-mainPurpleDark transition duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-light text-center flex items-center justify-center"
                        >
                            {loading ?
                                <ReactLoading type={"bars"} color={"white"} height={'30px'} width={'30px'} />
                                : 'Signup'
                            }
                        </button>
                    </form>

                    <div className="text-center mt-3">
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
                </AuthMain>
            }
            {
                newUser && !verificationStatus &&
                <AuthMain>
                    <VerifyMailCard newUser={newUser} handleEmailChange={handleEmailChange} />
                </AuthMain>
            }
        </AuthOuter >
    );
}

export default Signup;
