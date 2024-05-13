import mongoose, { Document, Schema } from 'mongoose';

export interface Address {
    street: string;
    postCode: number;
    city: string;
    state: string;
    country: string;
}

interface User extends Document {
    auth0Id: string;
    name: string;
    email: string;
    phone: number;
    addresses?: Address[];
}

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  postCode: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true }
})

const userSchema: Schema = new Schema<User>({
  auth0Id: { type: String, required: true },
  email: {type: String, required: true},
  name: String,
  phone: Number,
  addresses: [addressSchema],
});

export default mongoose.model<User>("User", userSchema);