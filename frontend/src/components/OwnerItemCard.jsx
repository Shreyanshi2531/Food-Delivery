import React, { useEffect, useState } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function OwnerItemCard({ item }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDeleteModal]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${serverUrl}/api/item/delete-item/${item._id}`, {
        withCredentials: true,
      });
      setShowDeleteModal(false);
      window.location.href = "/owner/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[290px] h-[420px] bg-white/90 backdrop-blur-md 
      rounded-3xl overflow-hidden border border-gray-100
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]
      hover:-translate-y-1 transition-all duration-300 
      flex flex-col group"
    >
      {/* IMAGE */}
      <div className="relative p-2 bg-white">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-44 object-cover rounded-2xl border border-gray-100"
        />

        {/* FOOD TYPE BADGE */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full
          text-xs font-semibold shadow-sm ${
            item.foodType === "Veg"
              ? "bg-green-100 text-green-700"
              : item.foodType === "Vegan"
                ? "bg-lime-100 text-lime-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {item.foodType}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        {/* NAME */}
        <h3 className="text-2xl font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>

        {/* CATEGORY */}
        <p className="text-sm text-[#e76f51] font-medium mt-1">
          {item.category}
        </p>

        {/* DESCRIPTION */}
        <p
          className="text-gray-500 text-sm leading-relaxed mt-3
          line-clamp-2 overflow-hidden h-[42px]"
        >
          {item.description}
        </p>

        {/* BOTTOM */}
        <div className="flex justify-between items-center mt-auto pt-5">
          {/* PRICE */}
          <div className="flex items-center text-2xl font-bold text-gray-800">
            <LuIndianRupee className="mr-1" />
            {item.price.toFixed(2)}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-item/${item._id}`)}
              className="px-4 py-2 rounded-xl bg-[#e76f51] text-white
      text-sm font-medium shadow-md hover:shadow-lg
      hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 rounded-xl bg-red-100 text-red-600
      text-sm font-medium hover:bg-red-200
      hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
             <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          onClick={() => setShowDeleteModal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm
  flex items-center justify-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 w-full max-w-md
  shadow-[0_10px_40px_rgba(0,0,0,0.15)]
  animate-in fade-in zoom-in duration-200"
          >
            {/* TITLE */}
            <h2 className="text-2xl font-semibold text-gray-800">
              Delete Item?
            </h2>

            {/* TEXT */}
            <p className="text-gray-500 mt-3 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">{item.name}</span>?
              This action cannot be undone.
            </p>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-7">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300
          text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-white
          hover:bg-orange-600 shadow-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerItemCard;
