const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: {type: String, unique: true},
  password:String,
  Birth_7date: Date,
  isAdmin: {type: Boolean, default: false},
});
const User = mongoose.model("User", userSchema);
module.exports = User;