import express from "express";
import { get } from "mongoose";
import { createEditShop } from "../controllers/shop.controllers.js";
import { isAuth } from "../middleware/auth.middleware.js";
import {upload} from "../middlewares/multar.js";

const shopRouter = express.Router();
shopRouter.get("/create-edit", isAuth, upload.single("image"), createEditShop);

export default shopRouter;