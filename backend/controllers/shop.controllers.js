import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";

export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    const owner = req.user._id;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      const shop = await Shop.create({
        name,
        city,
        state,
        address,
        owner: req.userId,
        image,
      });
    } else {
      shop = await Shop.findOneAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          owner: req.userId,
          image,
        },
        { new: true },
      );
    }

    await shop.populate("owner");
    res.status(201).json(shop);
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShopByOwner = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner items");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
