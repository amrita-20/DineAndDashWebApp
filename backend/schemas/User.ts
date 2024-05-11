import mongoose, { Document, Schema } from "mongoose";

interface Address {
  road: string;
  postCode: number;
  city: string;
  state: string;
  country: string;
}

export interface Cart {
  [dishId: string]: number;
}

const addressSchema: Schema<Address> = new Schema({
  road: String,
  postCode: Number,
  city: String,
  state: String,
  country: String,
});

export interface UserDocument extends Document {
  username: string;
  email: string;
  phone: number;
  address?: Address[];
  cart?: Cart;
}

const userSchema: Schema<UserDocument> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: Number,
  address: [addressSchema],
  cart: { type: Object, default: {} },
});

export default mongoose.model<UserDocument>("User", userSchema);
