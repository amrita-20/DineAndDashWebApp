import mongoose, { Schema } from "mongoose";

const orderItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  orderItems: [orderItemSchema],
  orderTime: { type: Date, default: Date.now },
  orderMethod: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model("Order", orderSchema);
