import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import AuctionDashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'
// Import our new theme
import './styles/theme.css'
import api from './utils/api'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Only log error, don't redirect here
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/auction" /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/auction" /> : <Register setUser={setUser} />} 
          />
          <Route 
            path="/auction" 
            element={user ? <AuctionDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              user?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App