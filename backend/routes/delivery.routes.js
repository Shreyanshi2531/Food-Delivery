import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  getAvailableDeliveryPartners,
  assignDeliveryPartner,
  getMyAssignedOrders,
  acceptDelivery,
  rejectDelivery,
  markOutForDelivery,
  markDelivered,
  deleteDeliveryHistory,
} from "../controllers/delivery.controllers.js";

const router = express.Router();

router.get("/available-partners", isAuth, getAvailableDeliveryPartners);

router.put("/assign", isAuth, assignDeliveryPartner);

router.get("/my-orders", isAuth, getMyAssignedOrders);

router.put("/accept", isAuth, acceptDelivery);

router.put("/reject", isAuth, rejectDelivery);

router.put("/out-for-delivery", isAuth, markOutForDelivery);

router.put("/delivered", isAuth, markDelivered);

router.put("/delete-history", isAuth, deleteDeliveryHistory);

export default router;
