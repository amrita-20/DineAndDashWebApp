import User from "../schemas/User";
import Dish from "../schemas/Dish";
import { getDish } from "./dishes";

async function getCartFromUser(userId: string) {
  try {
    const userData = await User.findOne({ _id: userId });
    return userData?.cart;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function sendToOrder(userId: string) {
  try {
    const userCart = await getCartFromUser(userId);
    const total = calculateTotal(userCart);
    return [userCart, total];
  } catch (err) {
    console.log(err);
  }
}

async function updateCart(userId: string, dishId: string, operator: string) {
  try {
    // Retrieve dish object
    const dish = (await Dish.findOne({ _id: dishId })) || {};
    // Get user cart
    const userCart = (await getCartFromUser(userId)) || []; // To check
    // Update cart
    const updatedCart = await modifyQuantity(
      userId,
      dishId,
      dish,
      operator,
      userCart
    );
    // Update user in DB
    const updateResult = await User.updateOne(
      { _id: userId },
      { $set: { cart: updatedCart } }
    );
    console.log("Update result:", updateResult);
    return !!updateResult;
  } catch (err) {
    console.log(err);
  }
}

const userId1 = "663d6e6b7643576b26aa5497"; // Bob
const dishId1 = "663d80b7f6597992c77971d0";
const operator = "+";

const userId2 = "663d6e6c7643576b26aa5499"; // Alice
const dishId2 = "663d80b7f6597992c77971d3";
// const operator = "+"

export function runCartTest() {
  updateCart(userId1, dishId1, operator);
  updateCart(userId2, dishId2, operator);
}

async function modifyQuantity(
  userId: string,
  dishId: string,
  dish: object,
  operator: string,
  userCart
) {
  // now cart is a mongoDB document embedding dish object, we can easily find and update
  try {
    if (operator === "+") {
      await User.updateOne(
        { _id: userId, "cart.dish": dishId },
        {
          $inc: {
            "cart.$.quantity": 1,
            "cart.$.subtotal": {
              $add: ["$cart.dish.price", "$cart.$.subtotal"],
            },
          },
        }
      );
    } else {
      await User.updateOne(
        { _id: userId, "cart.dish": dishId },
        {
          $inc: {
            "cart.$.quantity": -1,
            "cart.$.subtotal": {
              $subtract: ["$cart.$.subtotal", "$cart.dish.price"],
            },
          },
        }
      );
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
}



function calculateTotal(userCart) {
  return Object.keys(userCart)
    .reduce((total, key) => total + userCart[key].subtotal, 0)
    .toFixed(2);
}
