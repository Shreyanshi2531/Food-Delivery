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
import { setUserData } from "../redux/user.slice.js";

function SignUp() {
  const primaryColor = "#E76F51";
  const secondaryColor = "#A8D5BA";
  const backgroundColor = "#FFF8F2";
  const borderColor = "#EADFD7";
  const boxBorderColor = "#9CA3AF";
  const hoverColor = "#E89020";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${serverUrl}/api/auth/signup`,
      { fullName, email, mobile, password, role },
      { withCredentials: true }
    );  
    alert("Account Created Successfully!");
    dispatch(setUserData(res.data)); 
  } catch (error) {
    setError(error?.response?.data?.message || "Sign Up Failed!");
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSignUp = async () => {
    if (!mobile || !role) {
      setError(
        "Please enter mobile number and select role before signing up with Google.",
      );
      return;
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          mobile,
          role,
        },
        { withCredentials: true },
      );
      alert("Account Created Successfully!");
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
      alert("Google Sign Up Failed!");
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
          Create your account to get started with delicious food deliveries.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
            style={{
              border: `1px solid ${borderColor}`,
              "--tw-ring-color": boxBorderColor,
            }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 font-medium mb-2">
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

        <div className="mb-4">
          <label className="block text-sm text-gray-600 font-medium mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
            style={{
              border: `1px solid ${borderColor}`,
              "--tw-ring-color": boxBorderColor,
            }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 font-medium mb-2">
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

        <div className="mb-4">
          <label className="block text-sm text-gray-600 font-medium mb-2">
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className="cursor-pointer flex-1 text-center font-medium w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${boxBorderColor}` }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          className="w-full mt-2 px-4 py-3 rounded-xl text-white font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#E64323]"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} /> : "Sign Up"}
        </button>

        <button
          className="w-full mt-2 px-4 py-2 flex items-center justify-center gap-2 rounded-lg border border-gray-400 font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-200"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle size={20} />
          <span>Sign Up with Google</span>
        </button>

        <p className="text-red-600 font-semibold text-center my-2">{error}</p>

        <p
          className="flex items-center justify-center mt-2"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span
            className="px-1 cursor-pointer font-semibold hover:underline"
            style={{ color: primaryColor }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
