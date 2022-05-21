const express = require("express");

const orderRouter = express.Router();
const Order = require("../models/order");

orderRouter.get("/", async (req, res) => {
  try {
    let result = await Order.find();
    res.send({ orders: result, msg: "orders" });
  } catch (error) {
    console.log(error);
  }
});

orderRouter.get("/:id", async (req, res) => {
  try {
    let result = await Order.findById(req.params.id);
    res.send({ order: result, msg: "orders" });
  } catch (error) {
    console.log(error);
  }
});
orderRouter.post("/", async (req, res) => {
  try {
    let newOrder = new Order(req.body);

    let result = await newOrder.save();
    res.send({ result: result, msg: "order submitted !" });
  } catch (error) {
    console.log(error);
  }
});

orderRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Order.findByIdAndDelete(req.params.id);
    res.send({ result: result, msg: "order deleted !" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = orderRouter;