import Order from "../schemas/Order";
import User from "../schemas/User";

// dump all in a user cart
export async function placeOrder(userId: string) {
    
}

export async function getUserOrders(userId: string) {
  const orders = User.aggregate({
    $lookup: {
      from: "orders",
      localField: "userId",
      foreignField: "_id",
      as: "allOrders",
    },
  });
}
