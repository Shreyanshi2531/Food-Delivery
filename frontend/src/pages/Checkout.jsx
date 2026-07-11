import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { LuIndianRupee } from "react-icons/lu";
import { FaMapMarkerAlt, FaPhoneAlt, FaRegStickyNote } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cart.slice";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [note, setNote] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const FREE_DELIVERY_THRESHOLD = 300;

  const deliveryFee =
    items.length === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 30;

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + gst;

  const handlePlaceOrder = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }

    try {
      const orderItems = items.map((item) => ({
        item: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          shop: items[0].shop,
          customerName: name,
          items: orderItems,
          address,
          landmark,
          phone,
          note,
          subtotal,
          deliveryFee,
          gst,
          totalAmount: total,
          paymentMethod: "Cash on Delivery",
        },
        {
          withCredentials: true,
        },
      );

      dispatch(clearCart());

      toast.success("Order placed successfully!");

      navigate("/my-orders");
    } catch (error) {
      console.log(error);

      toast.error("Failed to place order.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="pt-28 pb-16 bg-[#fff9f6] min-h-screen">
        <div className="w-[92%] max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-8">
            {/* LEFT */}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-8">Delivery Details</h2>

              {/* NAME */}

              <div className="mb-6">
                <label className="font-medium mb-2 block">Full Name</label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter receiver's name"
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-[#E76F51]
                  "
                />
              </div>

              {/* PHONE */}

              <div className="mb-6">
                <label className="font-medium mb-2 flex items-center gap-2">
                  <FaPhoneAlt className="text-[#E76F51]" />
                  Phone Number
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-[#E76F51]
                  "
                />
              </div>

              {/* ADDRESS */}

              <div className="mb-6">
                <label className="font-medium mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#E76F51]" />
                  Delivery Address
                </label>

                <textarea
                  rows={5}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No., Street, Area..."
                  className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  resize-none
                  focus:border-[#E76F51]
                  "
                />
              </div>

              {/* LANDMARK */}

              <div className="mb-6">
                <label className="font-medium mb-2 block">
                  Landmark (Optional)
                </label>

                <input
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Nearby landmark"
                  className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-[#E76F51]
                  "
                />
              </div>

              {/* DELIVERY NOTE */}

              <div className="mb-8">
                <label className="font-medium mb-2 flex items-center gap-2">
                  <FaRegStickyNote className="text-[#E76F51]" />
                  Delivery Instructions (Optional)
                </label>

                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ring the bell once, leave at the door, etc."
                  className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  resize-none
                  focus:border-[#E76F51]
                  "
                />
              </div>

              {/* PAYMENT */}

              <h2 className="text-2xl font-bold mb-5">Payment Method</h2>

              <div className="space-y-4">
                {/* COD */}

                <label
                  className="
                  flex
                  items-center
                  justify-between
                  border-2
                  border-[#E76F51]
                  rounded-2xl
                  p-5
                  cursor-pointer
                  bg-[#fff7f3]
                  "
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      💵 Cash on Delivery
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Pay after your food is delivered.
                    </p>
                  </div>

                  <input
                    type="radio"
                    checked
                    readOnly
                    className="accent-[#E76F51]"
                  />
                </label>

                {/* UPI */}

                <div
                  className="
                  border
                  rounded-2xl
                  p-5
                  opacity-60
                  "
                >
                  <h3 className="font-semibold text-lg">🟣 UPI</h3>

                  <p className="text-sm text-gray-500 mt-1">Coming Soon</p>
                </div>

                {/* CARD */}

                <div
                  className="
                  border
                  rounded-2xl
                  p-5
                  opacity-60
                  "
                >
                  <h3 className="font-semibold text-lg">
                    💳 Credit / Debit Card
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">Coming Soon</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-7
              h-fit
              sticky
              top-28
              "
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* ITEMS */}

              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="
      flex
      items-center
      gap-4
      pb-4
      border-b
      border-gray-100
      "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
        w-16
        h-16
        rounded-xl
        object-cover
        "
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Qty : {item.quantity}
                      </p>
                    </div>

                    <div className="font-semibold flex items-center">
                      <LuIndianRupee />

                      {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* PRICE DETAILS */}

              <div className="space-y-4 text-[15px]">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>

                  <span className="font-medium flex items-center">
                    <LuIndianRupee />

                    {subtotal}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Fee</span>

                  {deliveryFee === 0 ? (
                    <span className="font-semibold text-green-600">
                      FREE
                    </span>
                  ) : (
                    <span className="font-medium flex items-center">
                      <LuIndianRupee />
                      {deliveryFee}
                    </span>
                  )}
                </div>

                {deliveryFee === 0 && subtotal >= FREE_DELIVERY_THRESHOLD && (
                  <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3">
                    <p className="text-sm font-medium text-green-700">
                      Congratulations! You've unlocked FREE delivery.
                    </p>
                  </div>
                )}

                {deliveryFee > 0 && (
                  <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3">
                    <p className="text-sm font-medium text-[#E76F51]">
                      Add{" "}
                      <span className="font-bold">
                        ₹{FREE_DELIVERY_THRESHOLD - subtotal}
                      </span>{" "}
                      more to unlock FREE delivery.
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">GST</span>

                  <span className="font-medium flex items-center">
                    <LuIndianRupee />

                    {gst}
                  </span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span className="flex items-center text-[#E76F51]">
                    <LuIndianRupee />

                    {total}
                  </span>
                </div>
              </div>

              {/* DELIVERY */}

              <div
                className="
  mt-7
  bg-[#FFF8F2]
  rounded-2xl
  p-5
  "
              >
                <p className="text-sm text-gray-500">Estimated Delivery</p>

                <h3 className="text-lg font-bold mt-1">🚴 25 - 35 mins</h3>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="
  w-full
  mt-7
  h-14
  rounded-2xl
  bg-[#E76F51]
  hover:bg-[#d95f42]
  text-white
  font-semibold
  text-lg
  transition
  shadow-md
  "
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
