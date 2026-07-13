import express from "express";
import {
  addReview,
  getShopReviews,
  checkUserReview,
} from "../controllers/review.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// Add Review
router.post("/add-review", isAuth, addReview);

// Get Reviews of a Shop
router.get("/shop/:shopId", getShopReviews);

router.get(
  "/my-review/:orderId",
  isAuth,
  checkUserReview
);

export default router;