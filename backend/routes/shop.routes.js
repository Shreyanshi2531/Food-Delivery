import express from "express";
import { 
  createEditShop, 
  getShopByOwner,
  updateCoverImage
} from "../controllers/shop.controllers.js";

import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multar.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create-edit",
  isAuth,
  upload.single("image"),
  createEditShop
);

shopRouter.get(
  "/get-shop",
  isAuth,
  getShopByOwner
);

shopRouter.put(
  "/update-cover-image",
  isAuth,
  upload.single("image"),
  updateCoverImage
);

export default shopRouter;