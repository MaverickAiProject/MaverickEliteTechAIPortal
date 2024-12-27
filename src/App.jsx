import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AiTools from "./pages/AiTools";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import ToolPage from "./pages/toolPage";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context)
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };


  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={!user ? <Navigate to={'/login'} /> : <Dashboard />} />
        <Route path="/ai-tools" element={!user ? <Navigate to={'/login'} /> : <AiTools />} />
        <Route path="/ai-tools/:toolSlug" element={!user ? <Navigate to={'/login'} /> : <ToolPage />} />
        <Route path="/billing" element={!user ? <Navigate to={'/login'} /> : <Billing />} />
        <Route path="/settings" element={!user ? <Navigate to={'/login'} /> : <Settings />} />
      </Route>

      <Route path="/login" element={user ? <Navigate to={'/'} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={'/'} /> : <Signup />} />
    </Routes>
  );
}

export default App;
