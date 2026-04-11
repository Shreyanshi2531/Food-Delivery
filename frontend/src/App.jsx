import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import './index.css'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import useGetCity from "./hooks/useGetCity";
import { ClipLoader } from "react-spinners";
import OwnerDashboard from './components/OwnerDashboard.jsx'

export const serverUrl="http://localhost:8000"

function App() {
  const { userData, loading } = useSelector((state) => state.user); // Add a loading state from redux
  useGetCurrentUser(); 
  useGetCity();
  
  // If we are still checking if the user is logged in, show a loader
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#E76F51" size={50} />
      </div>
    );
  }

  return (
    <Routes>
  <Route
    path='/signup'
    element={!userData ? <SignUp /> : <Navigate to={getRedirectPath(userData.role)} />}
  />
  <Route
    path='/signin'
    element={!userData ? <SignIn /> : <Navigate to={getRedirectPath(userData.role)} />}
  />

  {/* OWNER */}
  <Route
    path='/owner/dashboard'
    element={userData?.role === "owner" ? <OwnerDashboard /> : <Navigate to="/signin" />}
  />

  {/* DELIVERY */}
  <Route
    path='/delivery/dashboard'
    element={userData?.role === "deliveryBoy" ? <div>Delivery Dashboard</div> : <Navigate to="/signin" />}
  />

  {/* USER / HOME */}
  <Route
    path='/'
    element={
      !userData ? (
        <Navigate to="/signin" />
      ) : userData.role === "user" ? (
        <>
          <Navbar />
          <Home />
        </>
      ) : (
        // This is the fix: If they are logged in but NOT a user, 
        // send them to THEIR correct dashboard instead of /signin
        <Navigate to={getRedirectPath(userData.role)} />
      )
    }
  />
</Routes>
  );
}

// Helper function to keep code clean
const getRedirectPath = (role) => {
  if (role === "owner") return "/owner/dashboard";
  if (role === "deliveryBoy") return "/delivery/dashboard";
  return "/";
};

export default App
