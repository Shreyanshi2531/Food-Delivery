import Review from "../models/review.model.js";
import Shop from "../models/shop.model.js";
import Order from "../models/order.model.js";

// ADD REVIEW
export const addReview = async (req, res) => {
  try {
    const { shopId, rating, review, orderId } = req.body;

    // Check if user has a delivered order
    const deliveredOrder = await Order.findOne({
      user: req.userId,
      shop: shopId,
      orderStatus: "Delivered",
    });

    if (!deliveredOrder) {
      return res.status(400).json({
        success: false,
        message: "You can only review restaurants you've ordered from.",
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      user: req.userId,
      order: orderId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this restaurant.",
      });
    }

    await Review.create({
      order: orderId,
      shop: shopId,
      user: req.userId,
      rating,
      review,
    });

    // Get all reviews of this shop
    const reviews = await Review.find({
      shop: shopId,
    });

    // Calculate average rating
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    const averageRating = Number((totalRatings / reviews.length).toFixed(1));

    // Update shop
    await Shop.findByIdAndUpdate(shopId, {
      averageRating,
      totalReviews: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to add review.",
    });
  }
};

// GET SHOP REVIEWS
export const getShopReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      shop: req.params.shopId,
    })
      .populate("user", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
    });
  }
};

export const checkUserReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      user: req.userId,
      order: req.params.orderId,
    });

    res.status(200).json({
      success: true,
      reviewed: !!review,
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to check review.",
    });
  }
};
