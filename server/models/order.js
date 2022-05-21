const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: { type: mongoose.Schema.Types.Mixed },
    shipping: {
    address: String,
    city: String,
    postalCode: String,
    country: String
    },
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: {type: Boolean, default: false },
  },
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;