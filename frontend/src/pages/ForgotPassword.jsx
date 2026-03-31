import React from "react";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function ForgotPassword() {
  const primaryColor = "#E76F51"; // Rich warm orange
  const secondaryColor = "#A8D5BA"; // Pastel mint green
  const backgroundColor = "#FFF8F2"; // Warm creamy background
  const borderColor = "#EADFD7"; // Light beige border
  const boxBorderColor = "#9CA3AF"; // Light gray for input borders

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, {withCredentials:true});
      console.log(result.data);
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, {withCredentials:true});
      console.log(result.data);
      setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, {withCredentials:true});
      console.log(result.data);
      alert("Password reset successful! Please sign in with your new password.");
      navigate("/signin")
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#FFF8F2]">
      <div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ border: "1px solid #EADFD7" }}
      >
        <div className="flex items-center gap-4 mb-2 ">
          <MdOutlineKeyboardBackspace
            size={30}
            className="text-[#E76F51] cursor-pointer hover:scale-110 transition"
            onClick={()=>navigate("/signin")}/>
          <h1 className="text-2xl font-bold text-center text-[#E76F51]">
            Forgot Password
          </h1>
        </div>

        {step === 1 && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email address to receive a password reset link.
            </p>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 font-medium mb-3"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
                style={{
                  border: `1px solid ${borderColor}`,
                  "--tw-ring-color": boxBorderColor,
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className={`w-full max-w-md mt-2 px-4 py-3 rounded-xl text-white font-medium cursor-pointer transicdtion-all duration-200 ease-in-out hover:bg-[#E64323] hover:scale-101`}
              style={{ backgroundColor: primaryColor }}
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Enter the OTP sent to your email address.
            </p>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm text-gray-600 font-medium mb-3"
              >
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter the OTP"
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
                style={{
                  border: `1px solid ${borderColor}`,
                  "--tw-ring-color": boxBorderColor,
                }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className={`w-full max-w-md mt-2 px-4 py-3 rounded-xl text-white font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#E64323] hover:scale-101`}
              style={{ backgroundColor: primaryColor }}
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Enter your new password.
            </p>
            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-sm text-gray-600 font-medium mb-3"
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
                style={{
                  border: `1px solid ${borderColor}`,
                  "--tw-ring-color": boxBorderColor,
                }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm text-gray-600 font-medium mb-3"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
                style={{
                  border: `1px solid ${borderColor}`,
                  "--tw-ring-color": boxBorderColor,
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <button
              className={`w-full max-w-md mt-2 px-4 py-3 rounded-xl text-white font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#E64323] hover:scale-101`}
              style={{ backgroundColor: primaryColor }}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
