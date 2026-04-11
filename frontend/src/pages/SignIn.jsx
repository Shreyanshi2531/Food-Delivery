import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice";

function SignIn() {
  const primaryColor = "#E76F51"; // Rich warm orange
  const secondaryColor = "#A8D5BA"; // Pastel mint green
  const backgroundColor = "#FFF8F2"; // Warm creamy background
  const borderColor = "#EADFD7"; // Light beige border
  const boxBorderColor = "#9CA3AF"; // Light gray for input borders
  const hoverColor = "#E89020"; // Slightly deeper peach
  const surplusBadgeColor = "#7BC47F"; // Soft leafy green
  const surplusBg = "#E8F6EC";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${serverUrl}/api/auth/signin`,
      { email, password },
      { withCredentials: true }
    );
    dispatch(setUserData(res.data));
    alert("Logged in successfully!");
  } catch (error) {
    setError(error?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true },
      );
      alert("Google Sign In Successfully!");
      dispatch(setUserData(data));

      if (data.role === "owner") {
        navigate("/owner/dashboard");
      } else if (data.role === "deliveryBoy") {
        navigate("/delivery/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Google Sign In Failed!");
      console.log(error.response.data);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 w-full max-w-md`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Savora
        </h1>
        <p className="text-sm text-gray-600 mb-5">
          Login to your account to get started with delicious food deliveries.
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm text-gray-600 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
            style={{
              border: `1px solid ${borderColor}`,
              "--tw-ring-color": boxBorderColor,
            }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm text-gray-600 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
              style={{
                border: `1px solid ${borderColor}`,
                "--tw-ring-color": boxBorderColor,
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500 hover:text-primaryColor"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div
          className="text-right mb-2 text-[#E76F51] font-medium cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </div>

        <button
          className={`w-full max-w-md mt-2 px-4 py-3 rounded-xl text-white font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#E64323]`}
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Sign In"}
        </button>

        <button
          className={`w-full max-w-md mt-2 px-4 py-2 flex items-center justify-center gap-2 rounded-lg border border-gray-400 font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-200`}
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        <p className="text-red-600 font-semibold  text-center my-2">{error}</p>

        <p
          className="flex items-center justify-center mt-2"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span
            className="px-1 cursor-pointer text-primaryColor font-semibold hover:underline"
            style={{ color: primaryColor }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
