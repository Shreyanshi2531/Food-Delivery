import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import "./index.css";

// PAGES
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";

// COMPONENTS
import Navbar from "./components/Navbar.jsx";
import OwnerDashboard from "./components/OwnerDashboard.jsx";

// HOOKS
import useGetCurrentUser from "./hooks/useGetCurrentUser.jsx";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetShop from "./hooks/useGetShop.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData, loading } = useSelector((state) => state.user);

  useGetCurrentUser();
  useGetCity();
  useGetShop();

  // LOADER
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#E76F51" size={50} />
      </div>
    );
  }

  return (
    <Routes>

      {/* FORGOT PASSWORD */}
      <Route
        path="/forgot-password"
        element={
          !userData ? (
            <ForgotPassword />
          ) : (
            <Navigate to={getRedirectPath(userData.role)} />
          )
        }
      />

      {/* SIGNUP */}
      <Route
        path="/signup"
        element={
          !userData ? (
            <SignUp />
          ) : (
            <Navigate to={getRedirectPath(userData.role)} />
          )
        }
      />

      {/* SIGNIN */}
      <Route
        path="/signin"
        element={
          !userData ? (
            <SignIn />
          ) : (
            <Navigate to={getRedirectPath(userData.role)} />
          )
        }
      />

      {/* HOME */}
      <Route
        path="/"
        element={
          !userData ? (
            <Navigate to="/signin" />
          ) : userData.role === "user" ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : (
            <Navigate to={getRedirectPath(userData.role)} />
          )
        }
      />

      {/* OWNER DASHBOARD */}
      <Route
        path="/owner/dashboard"
        element={
          userData?.role === "owner" ? (
            <OwnerDashboard />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* DELIVERY DASHBOARD */}
      <Route
        path="/delivery/dashboard"
        element={
          userData?.role === "deliveryBoy" ? (
            <div>Delivery Dashboard</div>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* CREATE / EDIT SHOP */}
      <Route
        path="/create-edit-shop"
        element={
          userData?.role === "owner" ? (
            <CreateEditShop />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* ADD ITEM */}
      <Route
        path="/add-item"
        element={
          userData?.role === "owner" ? (
            <AddItem />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* EDIT ITEM */}
      <Route
        path="/edit-item/:itemId"
        element={
          userData?.role === "owner" ? (
            <EditItem />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

    </Routes>
  );
}

// REDIRECT HELPER
const getRedirectPath = (role) => {
  if (role === "owner") return "/owner/dashboard";
  if (role === "deliveryBoy") return "/delivery/dashboard";

  return "/";
};

export default App;