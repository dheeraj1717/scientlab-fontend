import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import SciNavbar from './components/SciNavbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Device from './components/Device';
import Environment from './components/Environment';

import './App.css';
import Profile from './components/Profile';

function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn ? <SciNavbar /> : ""}
        <div className="main-content">
          <Routes>
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/device"
              element={isLoggedIn ? <Device /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/environment"
              element={isLoggedIn ? <Environment /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
            />            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        {isLoggedIn ? <Sidebar /> : ""}
      </div>
    </BrowserRouter>
  );
}

export default App;
