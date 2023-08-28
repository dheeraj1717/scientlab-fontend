import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./components/styles.scss";
import { useSelector } from "react-redux";

import SciNavbar from "./components/SciNavbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Device from "./components/Device";
import Environment from "./components/Environment";
import { FaBars } from "react-icons/fa";
import "./App.css";
import Profile from "./components/Profile";
import NewDevice from "./components/newDevice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <BrowserRouter>
      <div>{isLoggedIn && <SciNavbar />}</div>
      <div className={`app ${toggled ? "toggled" : ""} `}>
        {isLoggedIn && (
          <Sidebar
            image={image}
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
          />
        )}

        <main className={`${isLoggedIn ? "flex-col" : "flex-row"}`}>
          {isLoggedIn && (
            <div
              className="btn-toggle mb-2 bg-black text-white w-fit p-2 rounded-md"
              onClick={() => handleToggleSidebar(true)}
            >
              <FaBars />
            </div>
          )}
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/device-metrics"
              element={
                isLoggedIn ? <Device /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/device"
              element={
                isLoggedIn ? <NewDevice /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/environment"
              element={
                isLoggedIn ? <Environment /> : <Navigate to="/login" replace />
              }
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
