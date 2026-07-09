import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { serverUrl } from "../App";
import { LuIndianRupee } from "react-icons/lu";
import { ClipLoader } from "react-spinners";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/my-orders`,
          {
            withCredentials: true,
          }
        );

        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

    const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Preparing":
        return "bg-orange-100 text-orange-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

    if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#E76F51" size={45} />
      </div>
    );
  }

    return (
    <>
      <Navbar />

      <div className="pt-28 pb-16 min-h-screen bg-[#fff9f6]">
        <div className="w-[92%] max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold mb-2">
            My Orders
          </h1>

          <p className="text-gray-500 mb-8">
            Track your current and previous food orders.
          </p>

          {orders.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">

              <h2 className="text-2xl font-semibold text-gray-700">
                No Orders Yet 🍽️
              </h2>

              <p className="text-gray-500 mt-3">
                Looks like you haven't placed any orders.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="
                  bg-white
                  rounded-3xl
                  shadow-sm
                  border
                  border-gray-100
                  p-6
                  "
                >

                  {/* TOP */}

                  <div className="flex justify-between items-start flex-wrap gap-4">

                    <div>

                      <h2 className="text-2xl font-bold text-gray-800">
                        {order.shop?.name}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>

                    </div>

                    <span
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${getStatusColor(order.orderStatus)}
                      `}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                  <hr className="my-6" />

                  {/* ITEMS */}

                  <div className="space-y-4">

                    {order.items.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-4"
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

                          <h3 className="font-semibold">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Qty : {item.quantity}
                          </p>

                        </div>

                        <div className="flex items-center font-semibold">

                          <LuIndianRupee />

                          {item.price * item.quantity}

                        </div>

                      </div>

                    ))}

                  </div>

                  <hr className="my-6" />

                  {/* FOOTER */}

                  <div className="flex justify-between items-center flex-wrap gap-4">

                    <div>

                      <p className="text-gray-500 text-sm">
                        Delivery Address
                      </p>

                      <p className="font-medium mt-1">
                        {order.address}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-gray-500 text-sm">
                        Total Paid
                      </p>

                      <div className="flex items-center justify-end text-2xl font-bold text-[#E76F51]">

                        <LuIndianRupee />

                        {order.totalAmount}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>
    </>
  );
}

export default MyOrders;