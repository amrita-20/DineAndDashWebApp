import mongoose, { Schema } from "mongoose";

type Address = {
  road: string;
  postCode: number;
  city: string;
  state: string;
  country: string;
};

type Cart = [[dishId: string, quantity: number, subtotal: number]]; // an array of arrays

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

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: Number,
  address: [addressSchema],
  cart: {
    type: [[String, Number, Number]],
    default: [[]]
  },
});

export default mongoose.model("User", userSchema);
