import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

function DeliveryDashboard() {
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [deliveryHistory, setDeliveryHistory] = useState([]);

  const fetchAssignedOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/delivery/my-orders",
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setActiveDeliveries(res.data.activeDeliveries);
        setDeliveryHistory(res.data.deliveryHistory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptDelivery = async (orderId) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/delivery/accept",
        { orderId },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAssignedOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const rejectDelivery = async (orderId) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/delivery/reject",
        { orderId },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAssignedOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const markOutForDelivery = async (orderId) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/delivery/out-for-delivery",
        { orderId },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAssignedOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const markDelivered = async (orderId) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/delivery/delivered",
        { orderId },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAssignedOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteHistory = async (orderId) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/delivery/delete-history",
        { orderId },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAssignedOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="pt-28 px-6">
        <h1 className="text-3xl font-bold">Delivery Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Manage your active deliveries and delivery history.
        </p>

        {activeDeliveries.length === 0 ? (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold">No deliveries assigned</h2>

            <p className="text-gray-500 mt-2">
              New delivery requests will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {activeDeliveries.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-orange-500">
                  {order.shop?.name}
                </h2>

                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.user?.fullName}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span> {order.phone}
                  </p>

                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {order.address}
                  </p>

                  <p>
                    <span className="font-semibold">Delivery Status:</span>{" "}
                    {order.deliveryStatus}
                  </p>

                  <p>
                    <span className="font-semibold">Total:</span> ₹
                    {order.totalAmount}
                  </p>
                </div>

                <div className="mt-5">
                  <h3 className="font-semibold mb-2">Ordered Items</h3>

                  <ul className="list-disc ml-6">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-6">
                  {order.deliveryStatus === "Assigned" && (
                    <>
                      <button
                        onClick={() => acceptDelivery(order._id)}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                      >
                        Accept Delivery
                      </button>

                      <button
                        onClick={() => rejectDelivery(order._id)}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                      >
                        Reject Delivery
                      </button>
                    </>
                  )}

                  {order.deliveryStatus === "Accepted" && (
                    <button
                      onClick={() => markOutForDelivery(order._id)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Out for Delivery
                    </button>
                  )}

                  {order.deliveryStatus === "Out for Delivery" && (
                    <button
                      onClick={() => markDelivered(order._id)}
                      className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {order.deliveryStatus === "Delivered" && (
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                      Delivered
                    </span>
                  )}

                  {order.deliveryStatus === "Rejected" && (
                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {deliveryHistory.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-12 mb-6">Delivery History</h2>

            <div className="space-y-6">
              {deliveryHistory.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-50 rounded-2xl shadow-md p-6"
                >
                  <h2 className="text-xl font-bold text-orange-500">
                    {order.shop?.name}
                  </h2>

                  <p className="mt-3">
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.user?.fullName}
                  </p>

                  <p>
                    <span className="font-semibold">Delivery Status:</span>{" "}
                    {order.deliveryStatus}
                  </p>

                  <p>
                    <span className="font-semibold">Total:</span> ₹
                    {order.totalAmount}
                  </p>

                  <button
                    onClick={() => deleteHistory(order._id)}
                    className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Delete History
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeliveryDashboard;
