import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import Notification from "../models/notification.model.js";
import { getIO } from "../socket.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const {
      shop,
      customerName,
      items,
      address,
      landmark,
      phone,
      note,
      subtotal,
      deliveryFee,
      gst,
      totalAmount,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      user: req.userId,
      customerName,
      shop,
      items,
      address,
      landmark,
      phone,
      note,
      subtotal,
      deliveryFee,
      gst,
      totalAmount,
      paymentMethod,
    });

    const shopData = await Shop.findById(shop);

const ownerRoom = shopData.owner.toString();

getIO().to(ownerRoom).emit("new-order", order);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

// USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    })
      .populate("shop")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// SHOP ORDERS
export const getShopOrders = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.userId,
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    const orders = await Order.find({
      shop: shop._id,
    })
      .populate("user", "fullName email mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shop orders",
    });
  }
};

// UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Accepted",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const allowedTransitions = {
      Pending: ["Accepted", "Cancelled"],
      Accepted: ["Preparing", "Cancelled"],
      Preparing: ["Out for Delivery"],
      "Out for Delivery": ["Delivered"],
      Delivered: [],
      Cancelled: [],
    };

    if (!allowedTransitions[order.orderStatus].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change order from "${order.orderStatus}" to "${status}".`,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        orderStatus: status,
      },
      {
        new: true,
      },
    ).populate("shop", "name");

    let title = "";
    let message = "";
    let type = "General";

    switch (status) {
      case "Accepted":
        title = "Order Accepted";
        message = `${updatedOrder.shop.name} has accepted your order.`;
        type = "Accepted";
        break;

      case "Preparing":
        title = "Preparing Your Order";
        message = `${updatedOrder.shop.name} has started preparing your order.`;
        type = "Preparing";
        break;

      case "Out for Delivery":
        title = "Out for Delivery";
        message = "Your order is on the way!";
        type = "Out for Delivery";
        break;

      case "Delivered":
        title = "Order Delivered";
        message = "Your order has been delivered. Enjoy your meal!";
        type = "Delivered";
        break;

      case "Cancelled":
        title = "Order Cancelled";
        message = "Your order has been cancelled.";
        type = "Cancelled";
        break;
    }

    const notification = await Notification.create({
  user: updatedOrder.user,
  order: updatedOrder._id,
  title,
  message,
  type,
});

const roomId = updatedOrder.user.toString();

console.log("📤 Sending socket event to room:", roomId);

getIO().to(roomId).emit("order-updated", updatedOrder);

getIO().to(roomId).emit("new-notification", notification);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Make sure the order belongs to the logged-in user
    if (order.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Allow deletion only for completed/cancelled orders
    if (
      order.orderStatus !== "Delivered" &&
      order.orderStatus !== "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Only delivered or cancelled orders can be deleted.",
      });
    }

    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete order.",
    });
  }
};
