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
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { userData, city } = useSelector((state) => state.user);
  const {myShopData} = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
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
    <div className="w-full h-20 flex items-center justify-between px-4 md:px-10 lg:px-15 fixed bg-[#FFF8F2] backdrop-blur-sm z-50">

      {/* MOBILE SEARCH BAR */}
      {showSearch && userData?.role === "user" && (
        <div className="md:hidden absolute top-20 left-3.5 w-85 h-12 bg-white border border-gray-100 shadow-md rounded-xl flex items-center gap-2 px-2">
          
          <div className="flex items-center w-[30%] overflow-hidden gap-2 px-2 border-r border-gray-300">
            <FaLocationDot size={18} className="text-[#e76f51]" />
            <div className="text-xs font-medium text-gray-600 truncate w-[80%]">
              {city}
            </div>
          </div>

          <div className="w-[68%] flex items-center gap-1 px-1 relative">
            <IoIosSearch size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-xs px-1 py-1 outline-none placeholder:text-gray-400"
            />
            <RxCross2
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      )}

      {/* LOGO */}
      <h1
        className="text-2xl md:text-4xl text-[#E76F51]"
        style={{ fontFamily: "pacifico" }}
      >
        Savora
      </h1>

      {/* USER SEARCH (MD+) */}
      {userData?.role === "user" && (
        <div className="hidden md:flex w-[40%] h-12 bg-white border border-gray-100 shadow-md rounded-xl items-center gap-3 px-2">
          
          <div className="flex items-center w-[30%] overflow-hidden gap-2 px-2 border-r border-gray-300">
            <FaLocationDot size={18} className="text-[#e76f51]" />
            <div className="text-sm font-medium text-gray-600 truncate w-[80%]">
              {city}
            </div>
          </div>

          <div className="w-[70%] flex items-center gap-2 px-2">
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="w-full text-sm outline-none placeholder:text-gray-400"
            />
            <IoIosSearch
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          </div>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* USER MOBILE SEARCH ICON */}
        {userData?.role === "user" && (
          <IoIosSearch
            size={22}
            className="cursor-pointer md:hidden text-[#e76f51]"
            onClick={() => setShowSearch(true)}
          />
        )}

        {/* OWNER SECTION */}
        {userData?.role === "owner" ? (
          <div className="flex items-center gap-3 md:gap-4">

            {/* IF SHOP EXISTS */}
            {myShopData ? (
              <>
                {/* ADD ITEM */}
                <button className="flex items-center justify-center gap-1 px-2 md:px-3 h-8 
                rounded-full bg-[#ec7456] text-white font-medium shadow-lg
                hover:scale-105 transition cursor-pointer">
                  <FaPlus size={16} />
                  <span className="hidden md:inline">Add Item</span>
                </button>

                {/* PENDING */}
                <div className="relative">
                  <div className="flex items-center justify-center gap-1 px-2 md:px-3 h-8 
                  rounded-full bg-[#ec7456] text-white font-medium shadow-lg
                  hover:scale-105 transition cursor-pointer">
                    <MdOutlinePendingActions size={16} />
                    <span className="hidden md:inline">Pending Orders</span>
                  </div>

                  <span className="absolute -top-1 -right-1.5 bg-white text-[#e76f51] text-[10px] font-bold min-w-4 h-4 flex items-center justify-center rounded-full shadow">
                    0
                  </span>
                </div>
              </>
            ) : (
              <button className="px-3 py-2 rounded-lg bg-[#e76f51] text-white text-sm font-medium hover:scale-105 transition cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}>
                Create Shop
              </button>
            )}

            {/* PROFILE */}
            <div
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 
              rounded-full bg-[#e76f51] text-white text-xl
              shadow-md cursor-pointer"
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
            <button className="hidden md:block px-3 py-2 rounded-lg bg-[#e76f51]/10 text-[#e76f51] text-sm font-medium">
              My Orders
            </button>

            {/* PROFILE */}
            <div
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 
              rounded-full bg-[#e76f51] text-white font-semibold cursor-pointer"
              onClick={() => setShowInfo((prev) => !prev)}
            >
              {userData?.fullName?.slice(0, 1)}
            </div>
          </>
        )}

        {/* DROPDOWN */}
        {showInfo && (
          <div className="absolute top-16 right-4 md:right-20 w-40 bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-3 z-50">
            
            <div className="text-sm font-semibold text-gray-800">
              {userData?.fullName}
            </div>

            {userData?.role === "user" && (
              <div className="md:hidden text-sm cursor-pointer">
                My Orders
              </div>
            )}

            <div
              className="text-[#e76f51] font-semibold text-sm cursor-pointer"
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
