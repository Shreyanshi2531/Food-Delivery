import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { FaStore } from "react-icons/fa";

function UserDashboard() {
  const { shops, loading } = useSelector((state) => state.shop);
  const { current_city } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-20">
        <p className="text-lg text-gray-500">Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">

      {/* HEADER */}
      <div className="w-[90%] flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Restaurants Near You
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            {current_city || "Your City"}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-[#fff2ec] px-5 py-3 rounded-2xl">
          <FaStore className="text-[#E76F51] text-xl" />
          <span className="font-semibold text-[#E76F51]">
            {shops.length} Restaurants
          </span>
        </div>

      </div>

      {/* NO RESTAURANTS */}
      {shops.length === 0 ? (
        <div
          className="w-[90%] bg-white rounded-3xl p-12
          text-center shadow-md border"
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            No Restaurants Found
          </h2>

          <p className="text-gray-500 mt-3">
            We couldn't find any restaurants in {current_city}.
          </p>
        </div>
      ) : (
        <div
          className="w-[90%]
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8"
        >
          {shops.map((shop) => (
            <RestaurantCard
              key={shop._id}
              shop={shop}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

