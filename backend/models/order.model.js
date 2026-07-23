import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },

        name: String,

        image: String,

        price: Number,

        quantity: Number,
      },
    ],

    address: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      default: 40,
    },

    gst: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Online"],
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Assigned",
        "Picked Up",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    deliveryStatus: {
    type: String,
    enum: [
        "Not Assigned",
        "Assigned",
        "Rejected",
        "Accepted",
        "Picked Up",
        "Out for Delivery",
        "Delivered"
    ],
    default: "Not Assigned",
},

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    deletedByDeliveryPartner: {
    type: Boolean,
    default: false,
},

  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
