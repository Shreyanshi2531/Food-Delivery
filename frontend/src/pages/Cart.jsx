import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cart.slice";
import Navbar from "../components/Navbar";
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const FREE_DELIVERY_THRESHOLD = 300;

  const deliveryFee =
    items.length === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 40;

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + gst;

  const remainingAmount = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);

  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <>
      <Navbar />

      <div className="pt-28 min-h-screen bg-[#fff9f6]">
        <div className="w-[90%] max-w-6xl mx-auto">
          {/* BACK BUTTON */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#E76F51] font-medium hover:underline mb-4"
          >
            <IoArrowBack size={20} />
            Continue Shopping
          </button>

          {/* PAGE TITLE */}

          <h1 className="text-4xl font-bold mb-10">My Cart</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md p-20 text-center">
              <h2 className="text-3xl font-semibold text-gray-700">
                Your cart is empty
              </h2>

              <p className="mt-4 text-gray-500">Add some delicious food 🍕</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* LEFT */}

              <div className="lg:col-span-2">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl shadow-sm p-5 mb-5 flex justify-between items-center"
                  >
                    <div className="flex gap-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 rounded-2xl object-cover"
                      />

                      <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-semibold">{item.name}</h2>

                        <div className="flex items-center mt-3 font-semibold">
                          <LuIndianRupee />
                          {item.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end gap-5">
                      <div className="flex border rounded-xl overflow-hidden">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          className="px-4 py-2 text-xl hover:bg-gray-100"
                        >
                          −
                        </button>

                        <div className="px-5 py-2 font-semibold">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => dispatch(increaseQuantity(item._id))}
                          className="px-4 py-2 text-xl hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-bold flex items-center text-lg">
                        <LuIndianRupee />
                        {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT */}

              <div className="bg-white rounded-3xl shadow-sm p-6 h-fit sticky top-28">
                <h2 className="text-2xl font-bold mb-6">Bill Details</h2>

                {/* FREE DELIVERY */}

                <div className="mb-7">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-gray-700">
                       Free Delivery Progress
                    </p>

                    <p className="text-sm font-semibold text-[#E76F51]">
                      ₹{subtotal} / ₹{FREE_DELIVERY_THRESHOLD}
                    </p>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        deliveryFee === 0 ? "bg-green-500" : "bg-[#E76F51]"
                      }`}
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  {deliveryFee === 0 ? (
                    <p className="mt-3 text-sm font-medium text-green-600">
                       Congratulations! You've unlocked FREE delivery.
                    </p>
                  ) : (
                    <p className="mt-3 text-sm font-medium text-[#E76F51]">
                       Add{" "}
                      <span className="font-bold">₹{remainingAmount}</span> more
                      to unlock FREE delivery.
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>

                    <span className="font-medium">₹ {subtotal}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Delivery Fee</span>

                    {deliveryFee === 0 ? (
                      <span className="font-semibold text-green-600">
                        FREE
                      </span>
                    ) : (
                      <span className="font-medium">₹ {deliveryFee}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>

                    <span className="font-medium">₹ {gst}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>

                    <span className="text-[#E76F51]">₹ {total}</span>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="
        w-full
        mt-6
        bg-[#E76F51]
        text-white
        py-3
        rounded-xl
        font-semibold
        hover:scale-[1.02]
        transition
      "
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => dispatch(clearCart())}
                    className="
        w-full
        mt-3
        border
        border-red-400
        text-red-500
        py-3
        rounded-xl
        hover:bg-red-50
        transition
      "
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
