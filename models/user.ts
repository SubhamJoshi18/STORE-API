import mongoose from "mongoose";

const schema = mongoose.Schema;
const productSchema = new schema({
  productName: {
    type: String,
    required: [true, "Product Name must be Required"],
    unique: true,
  },
  product_id: {
    type: Number,
    requried: [true, "Product ID must Be Required"],
  },
  registered_date: {
    type: Date,
    default: Date.now,
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    default: 2000,
  },
  rating: {
    type: Number,
    default: 4.4,
  },
  expiresIn: {
    type: Date,
    default: Date.now,
    expiresIn: 30 * 86400,
  },
});

const productmodel = mongoose.model("product", productSchema);
export default productmodel;
