const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require('./DB-Connect');
const dotenv = require('dotenv').config();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/user", require("./routes/user")); 
app.use("/products", require("./routes/product")); 
app.use("/order", require("./routes/order")); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on ${PORT}`)
);