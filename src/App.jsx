import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AiTools from "./pages/AiTools";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import ToolPage from "./pages/ToolPage";
import { Context } from "./context/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from "./pages/AboutUs";
import PrivacyPoilcy from "./pages/PrivacyPoilcy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUs from "./pages/ContactUs";
import PoliciesPage from "./pages/PoliciesPage";
import ImageGen from "./pages/ImageGen";
import ImageCompressor from "./pages/ImageCompressor";
import TextToVoice from "./pages/TextToVoice";
import YoutubeVideoGen from "./pages/YoutubeVideoGen";
import { Toaster } from "react-hot-toast";
import YtAnalytics from "./pages/YtAnalytics";

function App() {
  const { authorizedUser } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <>
      <Toaster
        position="bottom-right" // Set position to bottom-right
        toastOptions={{
          style: {
            border: '1px solid #5f13c5',
            padding: '16px',
            color: '#000000',
            fontWeight: '600',
          },
        }}
      />
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          {/* Secured Routes */}
          <Route
            path="/"
            element={!authorizedUser ? <Navigate to="/login" /> : <Dashboard />}
          />
          <Route
            path="/ai-tools"
            element={!authorizedUser ? <Navigate to="/login" /> : <AiTools />}
          />
          <Route
            path="/ai-tools/:toolSlug"
            element={!authorizedUser ? <Navigate to="/login" /> : <ToolPage />}
          />
          <Route
            path="/image-gen"
            element={!authorizedUser ? <Navigate to="/login" /> : <ImageGen />}
          />
          <Route
            path="/image-compressor"
            element={!authorizedUser ? <Navigate to="/login" /> : <ImageCompressor />}
          />
          <Route
            path="/text-to-voice"
            element={!authorizedUser ? <Navigate to="/login" /> : <TextToVoice />}
          />
          <Route
            path="/youtube-video-generator"
            element={!authorizedUser ? <Navigate to="/login" /> : <YoutubeVideoGen />}
          />
          <Route
            path="/youtube-analytics"
            element={!authorizedUser ? <Navigate to="/login" /> : <YtAnalytics />}
          />
          <Route
            path="/billing"
            element={!authorizedUser ? <Navigate to="/login" /> : <Billing />}
          />
          <Route
            path="/settings"
            element={!authorizedUser ? <Navigate to="/login" /> : <Settings />}
          />
          <Route
            path="/PolicyPage"
            element={!authorizedUser ? <Navigate to="/login" /> : <PoliciesPage />}
          />
        </Route>

        {/* Login Routes */}
        <Route
          path="/login"
          element={authorizedUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authorizedUser ? <Navigate to="/" /> : <Signup />}
        />

        {/* Local Details Routes */}
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/privacyPolicy" element={<PrivacyPoilcy />} />
        <Route path="/t&c" element={<TermsConditions />} />
        <Route path="/refundPolicy" element={<RefundPolicy />} />
        <Route path="/contactUs" element={<ContactUs />} />

      </Routes>
    </>
  );
}

export default App;
