import React from "react";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa6";

function CreateEditShop() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [image, setImage] = useState(null);

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen relative">
      {/* BACK BUTTON */}
      <div
        className="absolute top-5 left-5 z-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <MdOutlineKeyboardBackspace
          size={30}
          className="text-[#e76f51] hover:scale-110 transition"
        />
      </div>

{/* /*git commit -m "implemented role-based routing, owner dashboard logic, and create/edit shop form UI with image upload"*/ */}

      {/* CARD */}
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 border border-orange-100">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#e76f51] w-12 h-12" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {myShopData ? "Edit Shop" : "Create Your Shop"}
          </h2>
        </div>

        {/* FORM */}
        <form className="flex flex-col space-y-5">
          {/* SHOP NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51] transition"
            />
          </div>

          {/* SHOP IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Image
            </label>

            {/* IF IMAGE EXISTS → SHOW PREVIEW */}
            {image ? (
              <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md group">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                {/* DARK OVERLAY ON HOVER */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

                {/* ACTION BUTTONS */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                  <label className="bg-white text-sm px-3 py-1.5 rounded-md cursor-pointer shadow hover:bg-gray-100">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md shadow hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              /* DEFAULT UPLOAD UI */
              <label
                className="flex flex-col items-center justify-center w-full h-36 
      border-2 border-dashed border-gray-200 rounded-xl cursor-pointer 
      hover:border-[#e76f51] hover:bg-orange-50 transition"
              >
                <span className="text-3xl text-[#e76f51]">📷</span>
                <p className="text-sm mt-1 text-gray-600">Upload Shop Image</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Shop Address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
            />
          </div>

          {/* CITY + STATE */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Tell customers about your shop..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-[#e76f51] text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium"
          >
            {myShopData ? "Update Shop" : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
