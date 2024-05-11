import mongoose, { Schema } from 'mongoose';

type OrderItem = {
    productId: string;
    quantity: number;
}

type Order =  {
    userId: string;
    orderItems: OrderItem[];
    orderTime: Date;
    orderMethod: string;
    amount: number;
}

const orderItemSchema: Schema = new Schema<OrderItem>({
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

export default mongoose.model("Order", orderSchema);