import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaUtensils } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../components/Navbar.jsx";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function AddItem() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  // FORM STATES
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [loading, setLoading] = useState(false);

  // SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("foodType", isVeg ? "Veg" : "Non Veg");

    if (image) {
      formData.append("image", image);
    }

    await axios.post(
      `${serverUrl}/api/item/add-item`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    navigate("/owner/dashboard");

  } catch (err) {
    console.log(err);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">

      {/* NAVBAR */}
      <Navbar />

      {/* BACK BUTTON */}
      <div
        className="absolute top-24 left-5 z-10 cursor-pointer"
        onClick={() => navigate("/owner/dashboard")}
      >
        <MdOutlineKeyboardBackspace
          size={28}
          className="text-[#e76f51] hover:scale-110 transition"
        />
      </div>

      {/* MAIN */}
      <div className="flex justify-center px-4 pt-40 pb-10">

        <div
          className="w-full max-w-xl 
          bg-white/90 backdrop-blur-md 
          shadow-[0_10px_35px_rgba(0,0,0,0.08)] 
          rounded-3xl p-6 sm:p-7 
          border border-orange-100"
        >

          {/* HEADER */}
          <div className="flex flex-col items-center mb-6">

            <div className="bg-orange-100 p-3 rounded-full mb-3">
              <FaUtensils className="text-[#e76f51] w-9 h-9" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Add New Item
            </h2>

            <p className="text-gray-500 text-sm mt-1 text-center">
              Add delicious food items to your menu
            </p>

          </div>

          {/* FORM */}
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >

            {/* ITEM NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>

              <input
                type="text"
                placeholder="Enter Item Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Image
              </label>

              {image ? (
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-md group">

                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

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
                <label
                  className="flex flex-col items-center justify-center 
                  w-full h-36 border-2 border-dashed border-gray-200 
                  rounded-2xl cursor-pointer hover:border-[#e76f51] 
                  hover:bg-orange-50 transition"
                >

                  <span className="text-3xl text-[#e76f51]">
                    🍔
                  </span>

                  <p className="text-sm mt-2 text-gray-600">
                    Upload Food Image
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                </label>
              )}
            </div>

            {/* PRICE + CATEGORY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* PRICE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="₹ Enter Price"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>

                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option>Snacks</option>
                  <option>Burgers</option>
                  <option>Pizzas</option>
                  <option>Salads</option>
                  <option>Fries</option>
                  <option>Sandwiches</option>
                  <option>Wraps</option>
                  <option>Pasta</option>
                  <option>Drinks</option>
                  <option>Desserts</option>
                  <option>North Indian</option>
                  <option>South Indian</option>
                  <option>Chinese</option>
                  <option>Ice Creams</option>
                  <option>Momos</option>
                  <option>Others</option>
                </select>
              </div>

            </div>

            {/* VEG / NON VEG */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type
              </label>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setIsVeg(true)}
                  className={`flex-1 py-2.5 rounded-xl border transition font-medium ${
                    isVeg
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Veg
                </button>

                <button
                  type="button"
                  onClick={() => setIsVeg(false)}
                  className={`flex-1 py-2.5 rounded-xl border transition font-medium ${
                    !isVeg
                      ? "bg-red-100 border-red-500 text-red-700"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Non Veg
                </button>

              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>

              <textarea
                rows="3"
                placeholder="Write item description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <button
  type="submit"
  disabled={loading}
  className="w-full py-3 bg-[#e76f51] text-white rounded-xl 
  shadow-md hover:shadow-lg hover:scale-[1.01] 
  active:scale-95 transition-all duration-200 
  font-medium mt-2 flex items-center justify-center gap-3
  disabled:opacity-70 disabled:cursor-not-allowed"
>
  {loading ? (
    <>
      <ClipLoader color="#fff" size={20} />
      <span>Adding Item...</span>
    </>
  ) : (
    "Add Item"
  )}
</button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddItem;