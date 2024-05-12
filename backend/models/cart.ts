import User from "../schemas/User";
import mongoose from "mongoose";

// async function getCartFromUser(userId: string) {
//   try {
//     const userData = await User.findOne({ _id: userId });
//     return userData?.cart;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function sendToOrder(userId: string) {
//   try {
//     const userCart = await getCartFromUser(userId);
//     // const total = calculateTotal(userCart);
//     return [userCart, total];
//   } catch (err) {
//     console.log(err);
//   }
// }

async function updateCart(userId: string, dishId: string, operator: string) {
  const { ObjectId } = mongoose.Types;

  const userIdObj = new ObjectId(userId);
  const dishIdObj = new ObjectId(dishId);

  // now cart is a mongoDB document embedding dish object, we can easily find and update
  try {
    // const cart = await User.findOne({ _id: userIdObj, "cart.dish": dishIdObj });
    const user = await User.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new Error("User or dish not found in the cart.");
    }

    const cartItem = user.cart.find((item) => item.dish._id.equals(dishIdObj));
    
    if (!cartItem) {
      throw new Error("Dish not found in the cart.");
    }
    
    const price = cartItem.dish.price;
    let quantity = cartItem.quantity;
    let subtotal = cartItem.subtotal;

    if (operator === "+") {
      quantity += 1;
      subtotal += price;
    } else {
      quantity -= 1;
      subtotal -= price;
    }

    await User.updateOne(
      { _id: userIdObj, "cart.dish": dishIdObj },
      {
        $inc: {
          "cart.$.quantity": quantity,
          "cart.$.subtotal": subtotal,
        },
      }
    );
  } catch (err) {
    console.log(err);
    throw err;
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
  // updateCart(userId2, dishId2, operator);
}

// function calculateTotal(userCart: Cart) {
//   let total = 0;

//   for (const cartItem of userCart) {
//     total += cartItem.subtotal;
//   }

//   return total.toFixed(2);
// }
