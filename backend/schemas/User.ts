import mongoose, { Schema } from "mongoose";

import Dish from "./Dish";

type Address = {
  road: string;
  postCode: number;
  city: string;
  state: string;
  country: string;
};

type Cart = {
  dish: typeof Dish,
  quantity: number,
  subtotal: number
}; 

type User = {
  username: string;
  email: string;
  phone: number;
  address?: Address[];
  cart?: Cart[];
};

const addressSchema = new Schema<Address>({
  road: String,
  postCode: Number,
  city: String,
  state: String,
  country: String,
});

const cartSchema = new Schema<Cart>({
  dish: Dish,
  quantity: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
});

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: Number,
  address: [addressSchema],
  cart: [cartSchema]
});

export default mongoose.model("User", userSchema);
