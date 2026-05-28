import React from "react";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice.js";
import { setMyShopData } from "../redux/owner.slice.js";

function CreateEditShop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myShopData } = useSelector((state) => state.owner);
  const { userData } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const { current_city, current_state, current_address } = useSelector(
    (state) => state.user,
  );
  const [image, setImage] = useState(null);
  const [name, setName] = useState(myShopData?.name || "");
  const [City, setCity] = useState(myShopData?.city || current_city || "");
  const [State, setState] = useState(myShopData?.state || current_state || "");
  const [address, setAddress] = useState(
    myShopData?.address || current_address || "",
  );
  const [phone, setPhone] = useState(myShopData?.phone || "");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", City);
      formData.append("state", State);
      formData.append("address", address);
      formData.append("phone", phone);
      if (image) {
        formData.append("image", image);
      }
      const result = await axios.post(
  `${serverUrl}/api/shop/create-edit`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  }
);
      dispatch(setMyShopData(result.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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

      {/* PROFILE */}
      <div className="w-full flex justify-end pr-4">
        {" "}
        <div
          className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 
    rounded-full bg-[#e76f51] text-white text-xl
    shadow-md cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>
      </div>

      {/* DROPDOWN */}
      {showInfo && (
        <div className="absolute top-17 right-8 w-44 bg-white shadow-xl border border-gray-100 rounded-2xl p-2 z-50 animate-in fade-in zoom-in duration-200">
          {/* Name Section */}
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Account
            </p>
            <p className="text-[15px] font-bold text-[#264653] truncate">
              {userData?.fullName?.split(" ")[0]}{" "}
            </p>
          </div>

          {/* Logout Button */}
          <button
            className="flex w-full px-3 py-2 text-[#e76f51] font-bold text-sm hover:bg-red-50 rounded-lg transition-colors text-left"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      )}

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
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          {/* SHOP NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e76f51] transition"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
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
              onChange={(e) => setAddress(e.target.value)}
              value={address}
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
                onChange={(e) => setCity(e.target.value)}
                value={City}
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
                onChange={(e) => setState(e.target.value)}
                value={State}
              />
            </div>
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
