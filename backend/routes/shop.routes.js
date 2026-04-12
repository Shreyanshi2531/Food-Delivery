import express from "express";
import { get } from "mongoose";
import { createEditShop } from "../controllers/shop.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import {upload} from "../middlewares/multar.js";
import { getShopByOwner } from "../controllers/shop.controllers.js";

const shopRouter = express.Router();

shopRouter.get("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRouter.get("/get-shop", isAuth, getShopByOwner);

export default shopRouter;