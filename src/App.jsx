import React, { useContext, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AiTools from "./pages/AiTools";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import ToolPage from "./pages/ToolPage";
import { Context } from "./context/Context";

function App() {
  const { authorizedUser } = useContext(Context);
  const navigate = useNavigate()



  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <Routes>
      <Route element={<Layout />}>
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

      <Route
        path="/login"
        element={authorizedUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authorizedUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
