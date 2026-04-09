import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx"; 
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/user.slice.js";

function Navbar() {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = async() => {
    try{
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {withCredentials: true});
      dispatch(setUserData(null));
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className="w-full h-20 flex items-center justify-between px-4 md:px-10 lg:px-20 fixed bg-[#fff9f6] backdrop-blur-sm z-50">
      
      {showSearch && (
        <div
          className="md:hidden absolute top-20 left-3.5 w-85 h-12 bg-white border border-gray-100 
          shadow-md 
          hover:shadow-[0_10px_35px_rgba(0,0,0,0.12)] 
          transition-all duration-300 
          rounded-xl flex items-center gap-2 md:gap-3 px-2"
        >
          <div className="flex items-center w-[30%] md:w-[30%] overflow-hidden gap-2 px-2 border-r border-gray-300">
            <FaLocationDot size={18} className="text-[#e76f51]" />
            <div className="text-xs md:text-sm font-medium text-gray-600 truncate w-[80%]">
              {city}
            </div>
          </div>

          <div className="w-[68%] md:w-[80%] flex items-center gap-1 px-1 md:px-2 relative">
            <IoIosSearch
              size={20}
              className="text-gray-400 hover:text-[#e76f51] transition cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="w-full text-xs md:text-sm px-1 md:px-2 py-1 outline-none placeholder:text-gray-400 "
            />
            <RxCross2
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-[#E76F51] tracking-wide">
        Savora
      </h1>

      <div
        className="hidden md:flex w-[60%] lg:w-[40%] h-11 md:h-12 bg-white border border-gray-100 
        shadow-md
        hover:shadow-[0_10px_35px_rgba(0,0,0,0.12)] 
        transition-all duration-300 
        rounded-xl items-center gap-2 md:gap-3 px-2"
      >
        <div className="flex items-center w-[35%] md:w-[30%] overflow-hidden gap-2 px-2 border-r border-gray-300">
          <FaLocationDot size={18} className="text-[#e76f51]" />
          <div className="text-xs md:text-sm font-medium text-gray-600 truncate w-[80%]">
            {city}
          </div>
        </div>

        <div className="w-[65%] md:w-[80%] flex items-center gap-2 px-1 md:px-2">
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            className="w-full text-xs md:text-sm px-1 md:px-2 py-1 outline-none placeholder:text-gray-400"
          />
          <IoIosSearch
            size={20}
            className="text-gray-400 hover:text-[#e76f51] transition cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <IoIosSearch
          size={24}
          className="cursor-pointer md:hidden text-[#e76f51]"
          onClick={() => setShowSearch(true)} // ✅ added
        />

        <div className="relative cursor-pointer">
          <FiShoppingCart size={22} className="text-[#e76f51]" />
          <span className="absolute -right-2 -top-2 text-[10px] bg-[#e76f51] text-white rounded-full px-1.5">
            0
          </span>
        </div>

        <button className="hidden md:block px-3 py-2 rounded-lg bg-[#e76f51]/10 text-[#e76f51] text-sm font-medium cursor-pointer">
          My Orders
        </button>

        <div
          className="relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center 
            bg-[#e76f51] text-white font-semibold text-lg md:text-xl 
            cursor-pointer shadow-md"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {showInfo && (
          <div
            className="absolute top-16 right-4 md:right-20 w-40 md:w-44 
            bg-white border border-gray-100 
            shadow-[0_10px_40px_rgba(0,0,0,0.12)] 
            rounded-2xl p-4 flex flex-col gap-3 z-50"
          >
            <div className="text-sm md:text-[15px] font-semibold text-gray-800">
              {userData.fullName}
            </div>

            <div className="md:hidden font-semibold text-sm cursor-pointer">
              My Orders
            </div>

            <div className="text-[#e76f51] font-semibold text0sm cursor-pointer"
            onClick={handleLogOut}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;