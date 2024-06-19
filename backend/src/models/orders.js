"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    deliveryDetails: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        address: {
            street: { type: String },
            postCode: { type: Number, required: true },
            city: { type: String },
            state: { type: String, required: true },
            country: { type: String, required: true }
        },
    },
    cartItems: [
        {
            dishId: { type: String, required: true },
            quantity: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            imagePath: { type: String }
        },
    ],
    totalAmount: Number,
    deliveryFee: { type: Number, required: true },
    status: {
        type: String,
        enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
    },
    createdAt: { type: Date, default: Date.now },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
