import mongoose, { Schema } from "mongoose";

export const dishSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  dishType: {
    type: String,
    enum: [
      "pizza",
      "dessert",
      "rice",
      "noodles",
      "paella",
      "steak",
      "salad",
      "appetizer",
      "wine",
      "cheese",
      "seafood",
    ],
    required: true,
  },
  imagePath: { type: String, required: true },
});

export default mongoose.model("Dish", dishSchema);
