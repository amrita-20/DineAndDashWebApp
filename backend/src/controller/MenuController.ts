import { Request, Response } from "express";
import Dish from "../schemas/Dish";

// Get all dishes for menu
const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Dish.find();
    if (!menu) {
      return res.status(404).json({ message: "Dishes not found" });
    }
    return res.json({ menu });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occur while fetching menu" });
  }
};

export default {
  getMenu,
};
