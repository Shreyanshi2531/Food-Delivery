import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const primaryColor = "#E76F51"; // Rich warm orange
  const secondaryColor = "#A8D5BA"; // Pastel mint green
  const backgroundColor = "#FFF8F2"; // Warm creamy background
  const borderColor = "#EADFD7"; // Light beige border
  const boxBorderColor = "#9CA3AF"; // Light gray for input borders
  const hoverColor = "#E76F51"; // Slightly deeper peach
  const surplusBadgeColor = "#7BC47F"; // Soft leafy green
  const surplusBg = "#E8F6EC";

  const [showPassword, setShowPassword] = useState(false);

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
          className={`text-3xl font-semibold mb-2`}
          style={{ color: primaryColor }}
        >
          Savora
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries.
        </p>

        <div className="mb-5">
          <label
            htmlFor="fullName"
            className="block text-sm text-gray-600 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
            style={{ border: `1px solid ${borderColor}`, '--tw-ring-color': boxBorderColor }}
          />
        </div>

        <div className="mb-5">
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
            style={{ border: `1px solid ${borderColor}`, '--tw-ring-color': boxBorderColor }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="mobile"
            className="block text-sm text-gray-600 font-medium mb-2"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
            style={{ border: `1px solid ${borderColor}`, '--tw-ring-color': boxBorderColor }}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm text-gray-600 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-gray-700 transition-all duration-200 ease-in-out"
            style={{ border: `1px solid ${borderColor}`, '--tw-ring-color': boxBorderColor }}
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
      </div>
    </div>
  );
}

export default SignUp;
