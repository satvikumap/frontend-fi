// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import UpdateProfile from './pages/UpdateProfile';
import Home from './pages/homePage';
import { getToken } from './utils/auth'; // Function to get the token from localStorage
import { useParams } from 'react-router-dom';

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login', children }) => {
  return isAuthenticated ? children : <Navigate to={redirectPath} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid token exists in local storage
    const token = getToken();
    setIsAuthenticated(!!token); // Convert token value to a boolean
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* Login */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
        />

        {/* Signup */}
        <Route 
          path="/signup" 
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} 
        />

        {/* Update Profile */}
        <Route 
          path="/profile/update/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          } 
        />

        {/* Fallback for invalid routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
