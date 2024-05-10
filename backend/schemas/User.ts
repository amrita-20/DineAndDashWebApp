import mongoose, { Document, Schema } from 'mongoose';

interface Address {
    road: string;
    postCode: number;
    city: string;
    state: string;
    country: string;
}

interface User extends Document {
    username: string;
    email: string;
    phone: number;
    addresses?: Address[];
}

const addressSchema = new Schema({
  address: {
    road: String,
    postCode: Number,
    city: String,
    state: String,
    country: String
  }
})

const userSchema: Schema = new Schema<User>({
  username: { type: String, required: true },
  email: {type: String, required: true},
  phone: Number,
  addresses: [addressSchema],
});

export default mongoose.model<User>("User", userSchema);