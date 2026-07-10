import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setPendingOrders } from "../redux/owner.slice";

function OwnerOrders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/shop-orders`, {
        withCredentials: true,
      });

      setOrders(result.data.orders);
      const pendingCount = res.data.orders.filter(
        (order) => order.orderStatus === "Pending",
      ).length;

      dispatch(setPendingOrders(pendingCount));

      console.log(result.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${serverUrl}/api/order/update-status/${orderId}`,
        {
          status,
        },
        {
          withCredentials: true,
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-28 px-6 pb-10">
        <h1 className="text-3xl font-semibold mb-2">Incoming Orders</h1>

        <p className="text-gray-500 mb-8">Total Orders: {orders.length}</p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-xl font-semibold">No Orders Yet</h2>

            <p className="text-gray-500 mt-2">
              Orders from customers will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                {/* Customer */}
                <h2 className="text-xl font-semibold mb-3">
                  {order.customerName}
                </h2>

                <p className="text-gray-600">📧 {order.user.email}</p>

                <p className="text-gray-600">📞 {order.phone}</p>

                <p className="text-gray-600 mt-2">📍 {order.address}</p>

                {order.landmark && (
                  <p className="text-gray-600 mt-1">
                    🧭 Landmark: {order.landmark}
                  </p>
                )}

                {order.note && (
                  <p className="text-gray-600 mt-1">📝 Note: {order.note}</p>
                )}

                <hr className="my-4" />

                {/* Items */}
                <h3 className="font-semibold mb-2">Ordered Items</h3>

                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-1">
                    <span>{item.name}</span>

                    <span>x{item.quantity}</span>
                  </div>
                ))}

                <hr className="my-4" />

                {/* Bottom */}
                <div>
                  {order.orderStatus === "Pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(order._id, "Accepted")}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(order._id, "Cancelled")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {order.orderStatus === "Accepted" && (
                    <button
                      onClick={() => updateStatus(order._id, "Preparing")}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                      Mark Preparing
                    </button>
                  )}

                  {order.orderStatus === "Preparing" && (
                    <button
                      onClick={() =>
                        updateStatus(order._id, "Out for Delivery")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Out for Delivery
                    </button>
                  )}

                  {order.orderStatus === "Out for Delivery" && (
                    <button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delivered
                    </button>
                  )}

                  {order.orderStatus === "Delivered" && (
                    <span className="text-green-600 font-semibold">
                      ✅ Delivered
                    </span>
                  )}

                  {order.orderStatus === "Cancelled" && (
                    <span className="text-red-600 font-semibold">
                      ❌ Cancelled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerOrders;
