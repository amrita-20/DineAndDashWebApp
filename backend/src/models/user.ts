import mongoose, { Schema } from "mongoose";
import { dishSchema } from "./Dish";

const addressSchema = new Schema({
  road: String,
  postCode: Number,
  city: String,
  state: String,
  country: String,
});

const cartSchema = new Schema({
  dish: dishSchema,
  quantity: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: Number,
  address: [addressSchema],
  cart: [cartSchema],
});

export default mongoose.model("User", userSchema);
