import React, { useState, useContext, useEffect } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import ReactLoading from 'react-loading';
import PolicyLinks from "../components/PolicyLinks.jsx";
import LogoVideo from "../components/LogoVideo.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import AuthOuter from "../components/auth/AuthOuter.jsx";
import { images } from "../assets/images.js";
import AuthMain from "../components/auth/AuthMain.jsx";
import ExternalProviders from "../components/auth/ExternalProviders.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const [resetMailSent, setResetMailSent] = useState(false)
    const [timer, setTimer] = useState(0);

    // const { setAuthorizedUser, fetchUserData } = useContext(Context);
    const { setAuthorizedUser, fetchUserData } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                setAuthorizedUser(user);
                fetchUserData(user)
                setLoading(false)
                navigate("/");

            } else {
                setError('Account already exists! Please open your Email inbox and verify your email to continue.')
                setLoading(false)
                return;
            }


        } catch (err) {
            setError("Invalid email or password. Please try again.");
            console.error(err);
            setLoading(false)
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email to send password reset link.")
            return;
        }
        try {

            const q = query(collection(db, 'Users'), where("email", "==", email))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                setError("This email is not registered. Please check again.");
                return;
            }

            await sendPasswordResetEmail(auth, email)
            setError('');
            setResetMailSent(true);
            setTimer(30);

        } catch (err) {
            if (err.code === "auth/user-not-found") {
                setError("This email is not registered. Please check again.");
            } else if (err.code === "auth/invalid-email") {
                setError(" Please enter a valid email address.");
            } else {
                setError("Something went wrong. Try again later. " + err);
            }
        }
    }

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer])

    return (
        <AuthOuter>
            <AuthMain>
                <div className="flex mt-10 flex-col">
                    <h1 className="md:text-3xl text-2xl font-bold mb-2 text-center">
                        Welcome Back!
                    </h1>
                    <p className="text-center mb-5">Log in to access your dashboard</p>
                </div>
                <div className="">
                    <ExternalProviders />
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-mainPurple text-white font-bold rounded-xl text-xl hover:bg-mainPurpleDark transition duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-light text-center flex items-center justify-center"
                    >
                        {loading ?
                            <ReactLoading type={"bars"} color={"white"} height={'30px'} width={'30px'} />
                            : 'Login'
                        }
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                    </p>
                )}

                {/* Reset Password function */}
                {!resetMailSent
                    ? <div
                        className="text-greyText text-right mt-2 w-full"
                        onClick={handleForgotPassword}
                    >
                        <span className="border-b border-transparent w-fit hover:border-greyText transition-all ease-in-out duration-300 cursor-pointer"> Forgot password?</span>
                    </div>

                    : <div
                        className="text-greyText text-center mt-2 w-full"
                    ><div>
                            <p>
                                Password reset link has been sent to your email.
                            </p>

                            <p className="text-purpleText">
                                {timer > 0
                                    ? `Resend mail after ${timer} seconds.`
                                    : <button
                                        onClick={handleForgotPassword}
                                        className="text-purpleText font-semibold hover:underline"
                                    >
                                        Resend Email
                                    </button>
                                }
                            </p>
                        </div>
                    </div>
                }

                <div className="text-center mt-5">
                    <p>
                        Don’t have an account?{" "}
                        <Link to={"/signup"} className="text-purpleText font-semibold">
                            Sign up here
                        </Link>
                    </p>
                </div>

                <div>
                    <PolicyLinks />
                </div>
            </AuthMain>
        </AuthOuter>
    );
}

export default Login;
