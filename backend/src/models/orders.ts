import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: {
      street: { type: String},
      postCode: { type: Number, required: true },
      city: { type: String},
      state: { type: String, required: true },
      country: { type: String, required: true }
    },
  },
  cartItems: [
    {
      dishId: { type: String, required: true },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      price: {type: Number, required: true},
      imagePath: {type: String}
    },
  ],
  totalAmount: Number,
  deliveryFee: {type: Number, required: true},
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;