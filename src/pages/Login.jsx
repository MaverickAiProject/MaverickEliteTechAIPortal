import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import ReactLoading from 'react-loading';
import PolicyLinks from "../components/PolicyLinks.jsx";
import LogoVideo from "../components/LogoVideo.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const { setAuthorizedUser, fetchUserData } = useContext(Context);
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-dashboardBg ">
            <div className="w-[90%] text-textColor max-w-lg border-gray-400 border p-8 bg-whiteCard shadow-md rounded-md">
                <div>
                    <div className="w-44 sm:w-48 mx-auto mb-5">
                        <LogoVideo />
                    </div>
                    <h1 className="text-2xl font-bold text-purpleText text-center">
                        Welcome Back!
                    </h1>
                    <p className="text-center mb-5">Log in to access your dashboard</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-400 bg-inputBg rounded focus:outline-none focus:ring-2 focus:ring-purpleText "
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-400 bg-inputBg rounded focus:outline-none focus:ring-2 focus:ring-purpleText "
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-mainPurple hover:bg-mainPurpleDark text-white font-bold rounded  transition duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-ligh flex items-center justify-center"
                    >
                        {loading ?
                            <ReactLoading type={"bars"} color={"white"} height={'30px'} width={'30px'} />
                            : 'Login'
                        }
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p>
                        Don’t have an account?{" "}
                        <Link to={"/signup"} className="text-purpleText font-semibold">
                            Sign up here
                        </Link>
                    </p>
                </div>
                {error && (
                    <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                    </p>
                )}
                <div>
                    <PolicyLinks />
                </div>
            </div>
        </div>
    );
}

export default Login;
