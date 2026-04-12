import React from 'react'
import Navbar from './Navbar.jsx'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {!myShopData && (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
          
          <div className="w-full max-w-md 
          bg-white/80 backdrop-blur-md 
          shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
          rounded-3xl p-8 border border-gray-100
          hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)]
          transition-all duration-300">

            <div className="flex flex-col items-center text-center">

              {/* ICON */}
              <div className="bg-[#e76f51]/10 p-4 rounded-full mb-4">
                <FaUtensils className="text-[#E76F51] w-10 h-10" />
              </div>

              {/* TITLE */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 leading-snug">
                You don't have a shop yet
              </h2>

              {/* SUBTEXT */}
              <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed">
                Join our platform and reach thousands of hungry customers every day.
              </p>

              {/* BUTTON */}
              <button className="px-6 py-2.5 bg-[#e76f51] text-white rounded-xl 
              shadow-md hover:shadow-lg 
              hover:scale-105 active:scale-95 
              transition-all duration-200 font-medium"
              onClick={()=>navigate("/create-edit-shop")}>
                Get Started
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default OwnerDashboard
