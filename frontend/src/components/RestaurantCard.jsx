import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ shop }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${shop._id}`)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)]
      transition-all duration-300 hover:-translate-y-2"
    >
      {/* COVER IMAGE */}

      <div className="relative overflow-hidden h-56">

        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover
          group-hover:scale-110 transition duration-500"
        />

        <div
          className="absolute inset-0
          bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        />

        <div className="absolute bottom-4 left-5 text-white">

          <h2 className="text-2xl font-bold">
            {shop.name}
          </h2>

          <div className="flex items-center gap-2 text-sm mt-1 opacity-95">

            <FaLocationDot />

            <span>
              {shop.city}
            </span>

          </div>

        </div>

      </div>

      {/* DETAILS */}

      <div className="p-5">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              {shop.items.length} Items Available
            </p>

            <p className="text-[#E76F51] mt-2 font-medium">
              Explore Menu
            </p>

          </div>

          <div
            className="w-11 h-11 rounded-full
            bg-[#fff2ec]
            flex items-center justify-center
            group-hover:bg-[#E76F51]
            transition"
          >
            <HiOutlineArrowRight
              className="text-[#E76F51]
              group-hover:text-white
              text-xl"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default RestaurantCard;