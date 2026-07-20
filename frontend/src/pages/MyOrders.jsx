import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { serverUrl } from "../App";
import { LuIndianRupee } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import ConfirmModal from "../components/ConfirmModal";
import ReviewModal from "../components/ReviewModal";
import { useLocation } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [reviewedOrders, setReviewedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const location = useLocation();
  const orderRefs = useRef({});
  const [highlightedOrder, setHighlightedOrder] = useState(null);

  // Cancel Order
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${serverUrl}/api/order/update-status/${orderId}`,
        {
          status: "Cancelled",
        },
        {
          withCredentials: true,
        },
      );

      // Refresh orders
      const res = await axios.get(`${serverUrl}/api/order/my-orders`, {
        withCredentials: true,
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to cancel order.");
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${serverUrl}/api/order/delete/${orderId}`, {
        withCredentials: true,
      });

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete order.");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });

        const fetchedOrders = res.data.orders;

        setOrders(fetchedOrders);

        const reviewed = [];

        for (const order of fetchedOrders) {
          try {
            const result = await axios.get(
              `${serverUrl}/api/review/my-review/${order._id}`,
              {
                withCredentials: true,
              },
            );

            if (result.data.reviewed) {
              reviewed.push(order._id);
            }
          } catch (error) {
            console.log(error);
          }
        }

        setReviewedOrders(reviewed);
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

  useEffect(() => {
    if (!location.state?.orderId || orders.length === 0) return;

    const orderId = location.state.orderId;

    const orderElement = orderRefs.current[orderId];

    if (orderElement) {
      orderElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setHighlightedOrder(orderId);

      setTimeout(() => {
        setHighlightedOrder(null);
      }, 3000);
    }
  }, [orders, location.state]);

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
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>

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
                  ref={(el) => (orderRefs.current[order._id] = el)}
                  className={`
    rounded-3xl
    p-6
    transition-all
    duration-500
    ${
      highlightedOrder === order._id
        ? "bg-[#FFF2EC] border-2 border-[#E76F51] shadow-xl"
        : "bg-white border border-gray-100 shadow-sm"
    }
  `}
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
                      <div key={index} className="flex items-center gap-4">
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
                          <h3 className="font-semibold">{item.name}</h3>

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
                      <p className="text-gray-500 text-sm">Delivery Address</p>

                      <p className="font-medium mt-1">{order.address}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500 text-sm">Total Paid</p>

                      <div className="flex items-center justify-end text-2xl font-bold text-[#E76F51]">
                        <LuIndianRupee />
                        {order.totalAmount}
                      </div>

                      {/* Cancel Order */}

                      {(order.orderStatus === "Pending" ||
                        order.orderStatus === "Accepted") && (
                        <button
                          onClick={() => {
                            setSelectedOrderId(order._id);
                            setShowCancelModal(true);
                          }}
                          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Cancel Order
                        </button>
                      )}

                      {/* Delivered Order */}

                      {order.orderStatus === "Delivered" && (
                        <div className="flex justify-end gap-3 mt-4 flex-wrap">
                          {reviewedOrders.includes(order._id) ? (
                            <button
                              disabled
                              className="
          bg-green-100
          text-green-700
          px-4
          py-2
          rounded-xl
          font-medium
        "
                            >
                              ✅ Review Submitted
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedShop(order.shop);
                                setSelectedOrder(order);
                                setShowReviewModal(true);
                              }}
                              className="
          bg-[#E76F51]
          hover:bg-[#d85f43]
          text-white
          px-4
          py-2
          rounded-xl
          transition
        "
                            >
                              ⭐ Rate Restaurant
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setDeleteOrderId(order._id);
                              setShowDeleteModal(true);
                            }}
                            className="
        border
        border-red-300
        text-red-500
        hover:bg-red-50
        px-4
        py-2
        rounded-xl
        transition
      "
                          >
                            🗑 Delete Order
                          </button>
                        </div>
                      )}

                      {/* Cancelled Order */}

                      {order.orderStatus === "Cancelled" && (
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => {
                              setDeleteOrderId(order._id);
                              setShowDeleteModal(true);
                            }}
                            className="
        border
        border-red-300
        text-red-500
        hover:bg-red-50
        px-4
        py-2
        rounded-xl
        transition
      "
                          >
                            🗑 Delete Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showCancelModal}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? Once cancelled, the restaurant will be notified immediately."
        confirmText="Yes, Cancel"
        cancelText="Keep Order"
        onCancel={() => {
          setShowCancelModal(false);
          setSelectedOrderId(null);
        }}
        onConfirm={async () => {
          setShowCancelModal(false);

          await cancelOrder(selectedOrderId);

          setSelectedOrderId(null);
        }}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Order"
        message="Are you sure you want to permanently remove this order from your history?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteOrderId(null);
        }}
        onConfirm={async () => {
          setShowDeleteModal(false);

          await handleDeleteOrder(deleteOrderId);

          setDeleteOrderId(null);
        }}
      />

      <ReviewModal
        isOpen={showReviewModal}
        shopName={selectedShop?.name}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedShop(null);
          setSelectedOrder(null);
        }}
        onSubmit={async ({ rating, review }) => {
          try {
            await axios.post(
              `${serverUrl}/api/review/add-review`,
              {
                orderId: selectedOrder._id,
                shopId: selectedShop._id,
                rating,
                review,
              },
              {
                withCredentials: true,
              },
            );

            setReviewedOrders((prev) => [...prev, selectedOrder._id]);

            setShowReviewModal(false);
            setSelectedShop(null);
            setSelectedOrder(null);
          } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to submit review.");
          }
        }}
      />
    </>
  );
}

export default MyOrders;
