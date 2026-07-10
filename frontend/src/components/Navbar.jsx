import React, { useState, useRef, useEffect } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { setCurrentCity } from "../redux/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { serverUrl } from "../App";
import { setUserData } from "../redux/user.slice";

function Navbar() {
  const { userData, current_city } = useSelector((state) => state.user);
  const { myShopData, pendingOrders } = useSelector((state) => state.owner);
  const { items } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [citySearch, setCitySearch] = useState("");

  const [cities, setCities] = useState([]);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const locationRef = useRef(null);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/shop/cities`);

        setCities(res.data.cities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCities();

    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className="
        fixed
        top-0
        left-0
        right-0
        h-20
        bg-[#FFF8F2]/95
        backdrop-blur-md
        border-b
        border-gray-100
        z-50
        "
      >
        <div
          className="
          max-w-[1400px]
          mx-auto
          h-full
          px-4
          lg:px-8
          flex
          items-center
          justify-between
          "
        >
          {/* LEFT */}

          <div
            className="
            flex
            items-center
            w-[170px]
            lg:w-[200px]
            "
          >
            <h1
              onClick={() => navigate("/")}
              className="
              text-[34px]
              lg:text-[38px]
              text-[#E76F51]
              cursor-pointer
              select-none
              "
              style={{ fontFamily: "Pacifico" }}
            >
              Savora
            </h1>
          </div>

          {/* CENTER */}

          {userData?.role === "user" ? (
            <div
              className="
              hidden
              md:flex
              flex-1
              justify-center
              "
            >
              <div
                className="
                w-full
                max-w-[620px]
                h-14
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-md
                flex
                overflow-hidden
                "
              >
                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => setShowLocationDropdown((prev) => !prev)}
                    className="
      w-[180px]
      flex
      items-center
      justify-between
      px-5
      h-full
      border-r
      border-gray-200
      hover:bg-gray-50
      transition
    "
                  >
                    <div className="flex items-center gap-2">
                      <FaLocationDot className="text-[#E76F51]" />

                      <span className="truncate font-medium text-gray-700">
                        {current_city}
                      </span>
                    </div>

                    <span
                      className={`transition ${
                        showLocationDropdown ? "rotate-180" : ""
                      }`}
                    >
                      <RiArrowDropDownLine />
                    </span>
                  </button>

                  {showLocationDropdown && (
                    <div
                      className="
      absolute
      top-[64px]
      left-0
      w-[340px]
      bg-white
      rounded-2xl
      shadow-xl
      border
      border-gray-100
      overflow-hidden
      z-50
      animate-in
      fade-in
      zoom-in
      duration-150
    "
                    >
                      {/* GPS */}

                      <button
                        onClick={() => {
                          // We'll connect GPS later
                          setShowLocationDropdown(false);
                        }}
                        className="
    w-full
    px-5
    py-4
    text-left
    hover:bg-[#FFF8F2]
    transition
  "
                      >
                        <div className="flex gap-3">
                          <FaLocationDot
                            size={18}
                            className="text-[#E76F51] mt-1"
                          />

                          <div>
                            <h3 className="font-semibold text-[#E76F51]">
                              Detect Current Location
                            </h3>

                            <p className="text-sm text-gray-500">Using GPS</p>
                          </div>
                        </div>
                      </button>

                      <div className="border-t border-gray-100 px-5 py-4">
                        <input
                          type="text"
                          placeholder="Search for another location..."
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          className="
    w-full
    rounded-xl
    border
    border-gray-200
    px-4
    py-3
    outline-none
    focus:border-[#E76F51]
    transition
  "
                        />

                        <div className="mt-3 max-h-56 overflow-y-auto">
                          {filteredCities.map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                dispatch(setCurrentCity(city));

                                setCitySearch("");

                                setShowLocationDropdown(false);
                              }}
                              className={`
      w-full
      text-left
      px-4
      py-3
      rounded-xl
      transition
      ${
        current_city === city
          ? "bg-[#FFF2EC] text-[#E76F51] font-semibold"
          : "hover:bg-[#FFF8F2]"
      }
    `}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center px-5">
                  <input
                    type="text"
                    placeholder="Search restaurants or dishes..."
                    className="
                    flex-1
                    outline-none
                    text-sm
                    placeholder:text-gray-400
                    "
                  />

                  <IoIosSearch size={22} className="text-gray-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* RIGHT */}

          <div
            className="
            flex
            items-center
            gap-4
            lg:gap-5
            "
          >
            {userData?.role === "user" && (
              <button className="md:hidden" onClick={() => setShowSearch(true)}>
                <IoIosSearch size={24} className="text-[#E76F51]" />
              </button>
            )}

            {showSearch && userData?.role === "user" && (
              <div
                className="
      absolute
      top-20
      left-4
      right-4
      md:hidden
      bg-white
      rounded-2xl
      shadow-lg
      border
      border-gray-200
      flex
      items-center
      px-3
      py-3
    "
              >
                <FaLocationDot className="text-[#E76F51]" />

                <span className="mx-3 text-sm truncate">{current_city}</span>

                <input
                  className="flex-1 outline-none text-sm"
                  placeholder="Search..."
                />

                <RxCross2
                  size={22}
                  onClick={() => setShowSearch(false)}
                  className="cursor-pointer text-gray-500"
                />
              </div>
            )}

            {/* OWNER */}

            {userData?.role === "owner" ? (
              myShopData ? (
                <>
                  <button
                    onClick={() => navigate("/add-item")}
                    className="
          hidden
          md:flex
          items-center
          gap-2
          bg-[#E76F51]
          hover:bg-[#d86345]
          text-white
          px-4
          py-2.5
          rounded-xl
          transition
          font-medium
        "
                  >
                    <FaPlus size={14} />
                    Add Item
                  </button>

                  <button
                    className="
          hidden
          md:flex
          items-center
          gap-2
          bg-[#fff2ec]
          text-[#E76F51]
          px-4
          py-2.5
          rounded-xl
          transition
          hover:bg-[#ffe7de]
          font-medium
          relative
        "
                    onClick={() => navigate("/owner/orders")}
                  >
                    <MdOutlinePendingActions size={18} />

                    <span>Orders</span>

                    {pendingOrders > 0 && (
                      <span
                        className="
              absolute
              -top-2
              -right-2
              min-w-5
              h-5
              rounded-full
              bg-red-500
              text-white
              text-[10px]
              font-bold
              flex
              items-center
              justify-center
              px-1
            "
                      >
                        {pendingOrders}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="
        bg-[#E76F51]
        hover:bg-[#d86345]
        text-white
        px-5
        py-2.5
        rounded-xl
        transition
        font-medium
      "
                >
                  Create Shop
                </button>
              )
            ) : (
              <>
                {/* CART */}

                <button
                  onClick={() => navigate("/cart")}
                  className="
        relative
        p-3
        rounded-full
        hover:bg-[#fff2ec]
        transition
      "
                >
                  <FiShoppingCart size={23} className="text-[#264653]" />

                  {items.length > 0 && (
                    <span
                      className="
            absolute
            -top-1
            -right-1
            min-w-5
            h-5
            rounded-full
            bg-[#E76F51]
            text-white
            text-[10px]
            flex
            items-center
            justify-center
            font-bold
          "
                    >
                      {items.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>

                {/* ORDERS */}

                <button
                  onClick={() => navigate("/my-orders")}
                  className="md:hidden flex px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg text-left transition-colors"
                >
                  My Orders
                </button>

                <button
                  onClick={() => navigate("/my-orders")}
                  className="hidden md:block font-medium text-gray-700 hover:text-[#E76F51] transition"
                >
                  My Orders
                </button>
              </>
            )}

            {/* PROFILE */}

            <button
              onClick={() => setShowInfo(!showInfo)}
              className="
  w-11
  h-11
  rounded-full
  bg-[#E76F51]
  text-white
  font-semibold
  shadow-md
  hover:scale-105
  transition
  "
            >
              {userData?.fullName?.charAt(0)}
            </button>
          </div>

          {/* DROPDOWN */}

          {showInfo && (
            <div
              className="
    absolute
    top-[76px]
    right-6
    w-56
    bg-white
    rounded-2xl
    shadow-xl
    border
    border-gray-100
    overflow-hidden
    "
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Account
                </p>

                <h3 className="mt-1 font-semibold text-[#264653]">
                  {userData?.fullName}
                </h3>
              </div>

              <div className="py-2">
                {userData?.role === "user" && (
                  <button
                    className="
          md:hidden
          w-full
          text-left
          px-5
          py-3
          hover:bg-gray-50
          transition
          "
                  >
                    My Orders
                  </button>
                )}

                <button
                  onClick={handleLogOut}
                  className="
        w-full
        text-left
        px-5
        py-3
        text-[#E76F51]
        font-semibold
        hover:bg-red-50
        transition
        "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
