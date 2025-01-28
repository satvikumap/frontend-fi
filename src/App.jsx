import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import UpdateProfile from './pages/UpdateProfile';
import Home from './pages/homePage';
import { getToken } from './utils/auth';

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login', children }) => {
  return isAuthenticated ? children : <Navigate to={redirectPath} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token); 
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
      <Route
        path="/profile/update/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
