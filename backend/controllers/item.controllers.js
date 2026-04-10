import Shop from "../models/Shop.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Item from "../models/Item.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, description, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const item = await Item.create({
      name,
      category,
      foodType,
      description,
      price,
      image,
      shop: shop._id,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editItem = async (req, res) => {
  try {
    const { name, category, foodType, description, price } = req.body;
    const itemId = req.params.itemId;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const item = await Item.findByIdandUpdate(
      itemId,
      {
        name,
        category,
        foodType,
        description,
        price,
        image,
      },
      { new: true },
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
