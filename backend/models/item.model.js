import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Pizzas",
        "Desserts",
        "Drinks",
        "Burgers",
        "Fries",
        "Sandwiches",
        "North Indian",
        "South Indian",
        "Chinese",
        "Wraps",
        "Salads",
        "Ice Creams",
        "Pasta",
        "Momos",
        "Others",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Veg", "Non Veg", "Vegan"],
      default: "Veg",
      required: true,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
