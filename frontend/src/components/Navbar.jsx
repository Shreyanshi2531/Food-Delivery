import React, { use } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/user.slice.js";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

function Navbar() {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-20 flex items-center justify-between px-4 md:px-10 lg:px-15 fixed bg-whitesmoke backdrop-blur-sm z-50">
      {showSearch && userData.role == "user" && (
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

      <h1
        className="text-2xl md:text-4xl text-[#E76F51] tracking-wide"
        style={{ fontFamily: "pacifico" }}
      >
        Savora
      </h1>

      {userData.role === "user" && (
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
      )}

      <div className="flex items-center gap-2 md:gap-4">
        {/* USER MOBILE SEARCH */}
        {userData?.role === "user" && (
          <IoIosSearch
            size={22}
            className="cursor-pointer md:hidden text-[#e76f51]"
            onClick={() => setShowSearch(true)}
          />
        )}

        {/* OWNER BUTTONS */}
        {userData?.role === "owner" ? (
          <div className="flex items-center gap-3 md:gap-4">
            {/* ADD BUTTON */}
            <button
              className="flex items-center justify-center gap-1 md:gap-1 px-2 md:px-3 h-8 md:h-8 
  rounded-full bg-[#ec7456] text-white font-medium
  shadow-lg
  hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <FaPlus size={16} />
              <span className="hidden md:inline font-small">Add Item</span>
            </button>

            {/* PENDING ORDERS */}
            <div className="relative">
              <div
                className="flex items-center justify-center gap-1 md:gap-1 px-2 md:px-3 h-8 md:h-8 
    rounded-full bg-[#ec7456] text-white font-medium
    shadow-lg
    hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
              >
                <MdOutlinePendingActions size={16} />
                <span className="hidden md:inline">Pending Orders</span>
              </div>

              {/* BADGE */}
              <span className="absolute -top-1 -right-1.5 
bg-white text-[#e76f51] text-[10px] font-bold
min-w-[16px] h-[16px] flex items-center justify-center 
rounded-full shadow">
                0
              </span>
            </div>

            {/* PROFILE */}
            <div
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 
        rounded-full bg-[#e76f51] text-white text-xl
        shadow-[0_4px_12px_rgba(231,111,81,0.3)]
        hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "poppins" }}
              onClick={() => setShowInfo((prev) => !prev)}
            >
              {userData?.fullName?.slice(0, 1)}
            </div>
          </div>
        ) : (
          <>
            {/* CART */}
            <div className="relative cursor-pointer">
              <FiShoppingCart size={22} className="text-[#e76f51]" />
              <span className="absolute -right-2 -top-2 text-[10px] bg-[#e76f51] text-white rounded-full px-1.5">
                0
              </span>
            </div>

            {/* ORDERS */}
            <button
              className="hidden md:block px-3 py-2 rounded-lg 
        bg-[#e76f51]/10 text-[#e76f51] text-sm font-medium 
        hover:bg-[#e76f51]/20 transition cursor-pointer"
            >
              My Orders
            </button>

            {/* PROFILE */}
            <div
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 
        rounded-full bg-[#e76f51] text-white font-semibold 
        shadow-[0_4px_12px_rgba(231,111,81,0.3)]
        hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={() => setShowInfo((prev) => !prev)}
            >
              {userData?.fullName?.slice(0, 1)}
            </div>
          </>
        )}
        {/* DROPDOWN */}
        {showInfo && (
          <div
            className="absolute top-16 right-4 md:right-20 w-40 md:w-44 
      bg-white border border-gray-100 
      shadow-[0_10px_40px_rgba(0,0,0,0.12)] 
      rounded-2xl p-4 flex flex-col gap-3 z-50"
          >
            <div className="text-sm md:text-[15px] font-semibold text-gray-800">
              {userData?.fullName}
            </div>

            {userData?.role === "user" && (
              <div className="md:hidden font-semibold text-sm cursor-pointer">
                My Orders
              </div>
            )}

            <div
              className="text-[#e76f51] font-semibold text-sm cursor-pointer hover:underline"
              onClick={handleLogOut}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
