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
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

function App() {
  // const { authorizedUser } = useContext(Context);
  const { authorizedUser } = useAuth();

  return (
    <ThemeProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: '1px solid #5f13c5',
            padding: '16px',
            color: '#000000',
            fontWeight: '600',
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          {/* Secured Routes */}
          <Route path="/" element={!authorizedUser ? <Navigate to="/login" /> : <Dashboard />} />
          <Route path="/ai-tools" element={!authorizedUser ? <Navigate to="/login" /> : <AiTools />} />
          <Route path="/ai-tools/:toolSlug" element={!authorizedUser ? <Navigate to="/login" /> : <ToolPage />} />
          <Route path="/image-gen" element={!authorizedUser ? <Navigate to="/login" /> : <ImageGen />} />
          <Route path="/image-compressor" element={!authorizedUser ? <Navigate to="/login" /> : <ImageCompressor />} />
          <Route path="/text-to-voice" element={!authorizedUser ? <Navigate to="/login" /> : <TextToVoice />} />
          <Route path="/youtube-video-generator" element={!authorizedUser ? <Navigate to="/login" /> : <YoutubeVideoGen />} />
          <Route path="/youtube-analytics" element={!authorizedUser ? <Navigate to="/login" /> : <YtAnalytics />} />
          <Route path="/billing" element={!authorizedUser ? <Navigate to="/login" /> : <Billing />} />
          <Route path="/settings" element={!authorizedUser ? <Navigate to="/login" /> : <Settings />} />
          <Route path="/PolicyPage" element={!authorizedUser ? <Navigate to="/login" /> : <PoliciesPage />} />
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
    </ThemeProvider>
  );
}

export default App;

{/* <Route path="/" element={<Dashboard />} />
<Route path="/ai-tools" element={<AiTools />} />
<Route path="/ai-tools/:toolSlug" element={<ToolPage />} />
<Route path="/image-gen" element={<ImageGen />} />
<Route path="/image-compressor" element={<ImageCompressor />} />
<Route path="/text-to-voice" element={<TextToVoice />} />
<Route path="/youtube-video-generator" element={<YoutubeVideoGen />} />
<Route path="/youtube-analytics" element={<YtAnalytics />} />
<Route path="/billing" element={<Billing />} />
<Route path="/settings" element={<Settings />} />
<Route path="/PolicyPage" element={<PoliciesPage />} /> */}