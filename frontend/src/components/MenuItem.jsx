import React from "react";
import { LuIndianRupee } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cart.slice";

function MenuItem({ item, shopId }) {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const cartItem = items.find((i) => i._id === item._id);

  return (
    <div className="flex justify-between items-start border-b border-gray-200 py-6 hover:bg-white/60 transition px-2 rounded-xl">
      {/* LEFT */}
      <div className="flex-1 pr-6">
        {/* Veg / Non Veg */}
        <div className="mb-2">
          {item.foodType === "Veg" ? (
            <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
            </div>
          ) : (
            <div className="w-4 h-4 border border-red-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
            </div>
          )}
        </div>

        {/* NAME */}

        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>

        {/* PRICE */}

        <div className="flex items-center mt-2 text-base font-semibold text-gray-800">
          <LuIndianRupee className="text-sm mr-1" />
          {item.price}
        </div>

        {/* DESCRIPTION */}

        <p className="mt-3 text-sm text-gray-500 leading-6 line-clamp-2 max-w-xl">
          {item.description}
        </p>
      </div>

      {/* RIGHT */}

      <div className="relative flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-36 h-28 rounded-2xl object-cover shadow-sm"
        />

        {!cartItem ? (
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  ...item,
                  shop: shopId,
                }),
              )
            }
            className="
            absolute
            left-1/2
            -translate-x-1/2
            -bottom-3
            bg-white
            text-[#16a34a]
            font-bold
            text-sm
            px-6
            py-2
            rounded-xl
            shadow-md
            border
            border-gray-200
            hover:bg-green-50
            transition
            "
          >
            ADD
          </button>
        ) : (
          <div
            className="
            absolute
            left-1/2
            -translate-x-1/2
            -bottom-3
            bg-white
            rounded-xl
            shadow-md
            border
            border-gray-200
            flex
            items-center
            overflow-hidden
            "
          >
            <button
              onClick={() => dispatch(decreaseQuantity(item._id))}
              className="px-3 py-2 text-lg font-bold text-[#E76F51] hover:bg-gray-100"
            >
              −
            </button>

            <span className="px-3 font-semibold">{cartItem.quantity}</span>

            <button
              onClick={() => dispatch(increaseQuantity(item._id))}
              className="px-3 py-2 text-lg font-bold text-[#16a34a] hover:bg-gray-100"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuItem;
