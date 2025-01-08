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

function App() {
  const { authorizedUser } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <>
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
            path="/billing"
            element={!authorizedUser ? <Navigate to="/login" /> : <Billing />}
          />
          <Route
            path="/settings"
            element={!authorizedUser ? <Navigate to="/login" /> : <Settings />}
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
