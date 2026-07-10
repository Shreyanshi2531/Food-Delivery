import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";

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
    );

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
