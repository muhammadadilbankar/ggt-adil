// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {type: String, required: true},
    price: { type: Number, required: true },
    imageUrl: String,
    stock: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
