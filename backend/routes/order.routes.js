import express from "express";
import {
  placeOrder,
  getMyOrders,
  getShopOrders,
  updateOrderStatus,
} from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// Place Order
router.post("/place-order", isAuth, placeOrder);

// User Orders
router.get("/my-orders", isAuth, getMyOrders);

// Shop Orders
router.get("/shop-orders", isAuth, getShopOrders);

// Update Order Status
router.put("/update-status/:orderId", isAuth, updateOrderStatus);

export default router;
