import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaUtensils } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";

function EditItem() {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const { myShopData } = useSelector((state) => state.owner);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("Veg");

  // GET CURRENT ITEM
  useEffect(() => {
    const item = myShopData?.items?.find(
      (i) => i._id === itemId
    );

    if (item) {
      setName(item.name);
      setPrice(item.price);
      setDescription(item.description);
      setCategory(item.category);
      setFoodType(item.foodType);
      setPreviewImage(item.image);
    }
  }, [itemId, myShopData]);

  // UPDATE ITEM
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("foodType", foodType);

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.put(
      `${serverUrl}/api/item/edit-item/${itemId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    window.location.href = "/owner/dashboard";

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">

      <Navbar />

      {/* BACK BUTTON */}
      <div
        className="fixed top-24 left-5 z-10 cursor-pointer"
        onClick={() => navigate("/owner/dashboard")}
      >
        <MdOutlineKeyboardBackspace
          size={28}
          className="text-[#e76f51] hover:scale-110 transition"
        />
      </div>

      {/* MAIN */}
      <div className="flex justify-center px-4 pt-36 pb-10">

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
              Edit Item
            </h2>

            <p className="text-gray-500 text-sm mt-1 text-center">
              Update your food item details
            </p>

          </div>

          {/* FORM */}
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Image
              </label>

              <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-md group">

                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : previewImage
                  }
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <label className="bg-white text-sm px-4 py-2 rounded-lg cursor-pointer shadow hover:bg-gray-100 transition">

                    Change Image

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                  </label>

                </div>

              </div>
            </div>

            {/* PRICE + CATEGORY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                >
                  <option>Snacks</option>
                  <option>Pizzas</option>
                  <option>Desserts</option>
                  <option>Drinks</option>
                  <option>Burgers</option>
                  <option>Fries</option>
                  <option>Chinese</option>
                  <option>North Indian</option>
                </select>
              </div>

            </div>

            {/* FOOD TYPE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type
              </label>

              <div className="flex gap-3">

                {["Veg", "Non Veg", "Vegan"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFoodType(type)}
                    className={`flex-1 py-2.5 rounded-xl border transition font-medium ${
                      foodType === type
                        ? type === "Veg"
                          ? "bg-green-100 border-green-500 text-green-700"
                          : type === "Vegan"
                          ? "bg-lime-100 border-lime-500 text-lime-700"
                          : "bg-red-100 border-red-500 text-red-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}

              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>

              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-[#e76f51] text-white rounded-xl 
              shadow-md hover:shadow-lg hover:scale-[1.01] 
              active:scale-95 transition-all duration-200 font-medium mt-2"
            >
              Update Item
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditItem;