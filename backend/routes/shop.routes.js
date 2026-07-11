import express from "express";
import {
  createEditShop,
  getShopByOwner,
  updateCoverImage,
  getShopsByCity,
  getShopById,
  getCities,
  searchRestaurantsAndItems,
} from "../controllers/shop.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multar.js";

const shopRouter = express.Router();

shopRouter.post("/create-edit", isAuth, upload.single("image"), createEditShop);

shopRouter.get("/get-shop", isAuth, getShopByOwner);

shopRouter.put(
  "/update-cover-image",
  isAuth,
  upload.single("image"),
  updateCoverImage,
);

shopRouter.get("/get-shops/:city", getShopsByCity);

shopRouter.get("/search", searchRestaurantsAndItems);

shopRouter.get("/shop/:shopId", getShopById);

shopRouter.get("/cities", getCities);

export default shopRouter;
