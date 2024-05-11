import mongoose, { Document, Schema } from "mongoose";

type Dish = {
  name: String;
  description: String;
  price: Number;
  dishType:
    | "pizza"
    | "dessert"
    | "rice"
    | "noodles"
    | "paella"
    | "steak"
    | "salad"
    | "appetizer"
    | "wine"
    | "cheese"
    | "seefood";
  imagePath: String;
}

const dishSchema = new Schema<Dish>({
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
