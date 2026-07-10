import React, { useRef } from "react";
import Navbar from "./Navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { FaUtensils } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/owner.slice.js";
import { FaPen } from "react-icons/fa";
import OwnerItemCard from "./OwnerItemCard.jsx";
import StatCard from "./StatCard";
import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";

function OwnerDashboard() {
  const { myShopData, shopOrders = [] } = useSelector((state) => state.owner);

  const pendingOrders = shopOrders.filter(
    (order) => order.orderStatus === "Pending",
  ).length;

  const acceptedOrders = shopOrders.filter(
    (order) => order.orderStatus === "Accepted",
  ).length;

  const preparingOrders = shopOrders.filter(
    (order) => order.orderStatus === "Preparing",
  ).length;

  const outForDeliveryOrders = shopOrders.filter(
    (order) => order.orderStatus === "Out for Delivery",
  ).length;

  const deliveredOrders = shopOrders.filter(
    (order) => order.orderStatus === "Delivered",
  ).length;

  const cancelledOrders = shopOrders.filter(
    (order) => order.orderStatus === "Cancelled",
  ).length;

  const totalOrders = shopOrders.length;

  const todayRevenue = shopOrders
    .filter((order) => order.orderStatus === "Delivered")
    .reduce((total, order) => total + order.totalAmount, 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleCoverImageChange = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const result = await axios.put(
        `${serverUrl}/api/shop/update-cover-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      {!myShopData && (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
          <div
            className="w-full max-w-md 
            bg-white/80 backdrop-blur-md 
            shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
            rounded-3xl p-8 border border-gray-100
            hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)]
            transition-all duration-300"
          >
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
                Join our platform and reach thousands of hungry customers every
                day.
              </p>

              {/* BUTTON */}
              <button
                className="px-6 py-2.5 bg-[#e76f51] text-white rounded-xl 
                shadow-md hover:shadow-lg 
                hover:scale-105 active:scale-95 
                transition-all duration-200 font-medium"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {myShopData && (
        <div className="flex flex-col items-center min-h-[80vh] pt-25 px-4 py-10 gap-10">
          {/* SHOP CARD */}
          <div
            className="w-[90%] mx-auto bg-white/80 backdrop-blur-md 
shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
rounded-3xl p-6 sm:p-8 border border-gray-100"
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#e76f51]/10 p-3 rounded-full">
                <FaUtensils className="text-[#E76F51] w-6 h-6" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Welcome to {myShopData.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage your restaurant profile and orders
                </p>
              </div>
            </div>

            {/* IMAGE CARD */}
            <div
              className="relative w-full h-[220px] sm:h-[320px] rounded-2xl 
        overflow-hidden shadow-lg group"
            >
              {/* IMAGE */}
              <img
                src={myShopData.image}
                alt={myShopData.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />

              {/* EDIT SHOP BUTTON */}
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="absolute top-4 right-4 z-20 
          bg-white/80 p-3 rounded-full
          hover:scale-110 transition-all duration-200"
              >
                <FaPen className="text-[#E76F51] w-4 h-4" />
              </button>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-gradient-to-t 
          from-black/60 via-black/20 to-transparent"
              />

              {/* TEXT */}
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-2xl font-semibold">{myShopData.name}</h3>

                <p className="text-sm text-gray-200">
                  {myShopData.city}, {myShopData.state}
                </p>
              </div>

              {/* HIDDEN INPUT */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleCoverImageChange}
              />

              {/* BUTTON */}
              <div
                className="absolute inset-0 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-5 py-2.5 bg-[#e76f51] text-white rounded-xl 
            shadow-lg hover:scale-105 active:scale-95 
            transition-all duration-200 font-medium"
                >
                  Edit Cover Image
                </button>
              </div>
            </div>
          </div>

          <div className="w-[90%] mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue */}

              <div
                className="
      rounded-3xl
      p-7
      bg-gradient-to-r
      from-emerald-500
      to-green-600
      text-white
      shadow-xl
      "
              >
                <p className="text-sm opacity-90">Total Revenue</p>

                <h2 className="text-4xl font-bold mt-2">₹{todayRevenue}</h2>

                <p className="mt-3 text-sm opacity-80">From delivered orders</p>
              </div>

              {/* Total Orders */}

              <div
                className="
      rounded-3xl
      p-7
      bg-gradient-to-r
      from-[#E76F51]
      to-[#F4A261]
      text-white
      shadow-xl
      "
              >
                <p className="text-sm opacity-90">Total Orders</p>

                <h2 className="text-4xl font-bold mt-2">{totalOrders}</h2>

                <p className="mt-3 text-sm opacity-80">Orders received</p>
              </div>
            </div>
          </div>

          {/* TODAY'S OVERVIEW */}

          <div className="w-[90%] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Today's Overview
              </h2>

              <button
                onClick={() => navigate("/owner/orders")}
                className="text-[#E76F51] font-semibold hover:underline"
              >
                View Orders →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Pending Orders"
                value={pendingOrders}
                icon={<FiClock className="text-yellow-600" />}
                bgColor="bg-yellow-50"
                textColor="text-yellow-700"
                onClick={() => navigate("/owner/orders")}
              />

              <StatCard
                title="Accepted"
                value={acceptedOrders}
                icon={<FiCheckCircle className="text-blue-600" />}
                bgColor="bg-blue-50"
                textColor="text-blue-700"
              />

              <StatCard
                title="Preparing"
                value={preparingOrders}
                icon={<MdRestaurant className="text-orange-600" />}
                bgColor="bg-orange-50"
                textColor="text-orange-700"
              />

              <StatCard
                title="Out for Delivery"
                value={outForDeliveryOrders}
                icon={<FiTruck className="text-purple-600" />}
                bgColor="bg-purple-50"
                textColor="text-purple-700"
              />

              <StatCard
                title="Delivered"
                value={deliveredOrders}
                icon={<FiPackage className="text-green-600" />}
                bgColor="bg-green-50"
                textColor="text-green-700"
              />

              <StatCard
                title="Cancelled"
                value={cancelledOrders}
                icon={<FiXCircle className="text-red-600" />}
                bgColor="bg-red-50"
                textColor="text-red-700"
              />
            </div>
          </div>

          {/* NO ITEMS CARD */}
          {myShopData.items.length === 0 && (
            <div
              className="w-full max-w-2xl 
        bg-white/80 backdrop-blur-md 
        shadow-[0_10px_35px_rgba(0,0,0,0.06)] 
        rounded-3xl p-6 sm:p-8 border border-gray-100
        flex flex-col items-center justify-center text-center"
            >
              {/* ICON */}
              <div className="bg-[#e76f51]/10 p-3 rounded-full mb-4">
                <FaUtensils className="text-[#E76F51] w-7 h-7" />
              </div>

              {/* TITLE */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                No Items Added Yet
              </h2>

              {/* SUBTEXT */}
              <p className="text-gray-500 text-sm sm:text-base max-w-md mb-5 leading-relaxed">
                Your menu is empty right now. Add your first food item and start
                serving customers.
              </p>

              {/* BUTTON */}
              <button
                className="px-5 py-2.5 bg-[#e76f51] text-white rounded-xl 
          shadow-md hover:shadow-lg 
          hover:scale-105 active:scale-95 
          transition-all duration-200 font-medium"
                onClick={() => navigate("/add-item")}
              >
                Add Your First Item
              </button>
            </div>
          )}

          {/* ITEMS GRID */}
          {myShopData.items.length > 0 && (
            <div
              className="w-[90%] mx-auto mt-8
  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-6 justify-items-center"
            >
              {myShopData.items.map((item) => (
                <OwnerItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
