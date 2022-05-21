const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    category:String,
    createdAt: {type: Date, default: Date.now},
    quantity: {type: Number, default: 0},
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;