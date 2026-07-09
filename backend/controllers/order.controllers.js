import Order from "../models/order.model.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const {
      shop,
      items,
      address,
      phone,
      subtotal,
      deliveryFee,
      gst,
      totalAmount,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      user: req.userId,
      shop,
      items,
      address,
      phone,
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
    const orders = await Order.find({
      shop: req.params.shopId,
    })
      .populate("user", "fullName email")
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

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        orderStatus: status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Order updated",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};