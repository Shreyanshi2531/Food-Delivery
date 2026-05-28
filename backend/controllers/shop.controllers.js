import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";

export const createEditShop = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.userId);
    const { name, city, state, address } = req.body;
    const owner = req.userId;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        owner,
        image,
      });
    } else {
      shop = await Shop.findOneAndUpdate(
        { _id: shop._id },
        {
          name,
          city,
          state,
          address,
          owner,
          ...(image && { image }),
        },
        { new: true },
      );
    }

    await shop.populate("owner items");

    res.status(201).json(shop);
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShopByOwner = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner items",
    );
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCoverImage = async (req, res) => {
  try {
    const owner = req.userId;

    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOneAndUpdate(
      { owner },
      { image },
      { new: true }
    );

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    return res.status(200).json(shop);

  } catch (error) {
    console.error("Error updating cover image:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};