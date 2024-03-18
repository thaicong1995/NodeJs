const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductCode: String,
  ProductName: String,
  ProductDate: Date, 
  ProductOriginPrice: Number,
  Quantity: Number,
  ProductStoreCode: String
});

const Product = mongoose.model('ProductManager', productSchema);

module.exports = Product;
