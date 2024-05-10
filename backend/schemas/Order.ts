import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
    productId: string;
    quantity: number;
}

interface Order extends Document {
    userId: string;
    orderItems: OrderItem[];
    orderTime: Date;
    orderMethod: string;
    amount: number;
}

const orderItemSchema: Schema = new Schema({
    productId: {type: String, required: true},
    quantity: {type: Number, required: true}
})

const orderSchema: Schema= new Schema<Order>({
  userId: {type:String, required: true},
  orderItems: [orderItemSchema],
  orderTime: {type: Date, default: Date.now},
  orderMethod: {type: String, required: true},
  amount: {type: Number, required: true},
});

export default mongoose.model<Order>("Order", orderSchema);