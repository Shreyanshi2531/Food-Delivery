import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/", isAuth, getNotifications);

router.put("/read/:id", isAuth, markAsRead);

router.put("/read-all", isAuth, markAllAsRead);

export default router;