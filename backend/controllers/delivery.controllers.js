import User from "../models/user.model.js";
import Order from "../models/order.model.js";

export const getAvailableDeliveryPartners = async (req, res) => {
  try {
    const partners = await User.find({
      role: "deliveryBoy",
      isAvailable: true,
    }).select("fullName vehicleType vehicleNumber");

    res.status(200).json({
      success: true,
      partners,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch delivery partners",
    });
  }
};

export const assignDeliveryPartner = async (req, res) => {
  try {
    const owner = await User.findById(req.userId);

    if (!owner || owner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Only restaurant owners can assign delivery partners.",
      });
    }
    const { orderId, deliveryPartnerId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.deliveryPartner = deliveryPartnerId;
    order.deliveryStatus = "Assigned";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery partner assigned successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to assign delivery partner",
    });
  }
};

export const getMyAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
  deliveryPartner: req.userId,
  deletedByDeliveryPartner: false,
})
      .populate("shop")
      .populate("user")
      .sort({ createdAt: -1 });

    const activeDeliveries = orders.filter(order =>
  ["Assigned", "Accepted", "Out for Delivery"].includes(order.deliveryStatus)
);

const deliveryHistory = orders.filter(order =>
  ["Delivered", "Rejected"].includes(order.deliveryStatus)
);

res.status(200).json({
  success: true,
  activeDeliveries,
  deliveryHistory,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned orders.",
    });
  }
};

export const acceptDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      deliveryPartner: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.deliveryStatus = "Accepted";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery accepted.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const rejectDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      deliveryPartner: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.deliveryPartner = null;
    order.deliveryStatus = "Rejected";
    order.orderStatus = "Preparing";

    await order.save();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery rejected.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const markOutForDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      deliveryPartner: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.deliveryStatus = "Out for Delivery";
    order.orderStatus = "Out for Delivery";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order is now out for delivery.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const markDelivered = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      deliveryPartner: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.deliveryStatus = "Delivered";
    order.orderStatus = "Delivered";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order delivered successfully.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const deleteDeliveryHistory = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      deliveryPartner: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.deletedByDeliveryPartner = true;

    await order.save();

    res.status(200).json({
      success: true,
      message: "History deleted successfully.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};