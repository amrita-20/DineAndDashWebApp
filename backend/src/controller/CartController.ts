import User from "../models/User";
import Dish from "../models/Dish";


//////////////////////APIs///////////////////////////


//////////////////////Functions//////////////////////

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
  try {
    // Get user
    const user = await User.findById(userId);
    if (!user || !user.cart) {
      throw new Error("User or cart not found");
    }

    // Get dish
    const dish = await Dish.findById(dishId);
    if (!dish) {
      throw new Error("Dish not found");
    }

    // Get dish price, since we need it in cartItem
    const price = dish.price;
    for (const cartItem of user.cart) {
      if ((cartItem.dish as any)._id.toString() === dishId) {
        // Update quantity and subtotal;
        let quantity = cartItem.quantity;
        if (operator === "+") {
          quantity++;
        } else if (operator === "-" && quantity > 0) {
          quantity--;
        }
        const subtotal = price * quantity;

        cartItem.quantity = quantity;
        cartItem.subtotal = subtotal;

        // Save the updated user document
        await user.save();
        return;
      }
    }

    // push
    const quantity = 1;
    const subtotal = price * quantity;
    user.cart.push({ dish, quantity, subtotal });
    await user.save();
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// const userId1 = "663d6e6b7643576b26aa5497"; // Bob
// const dishId1 = "663d80b7f6597992c77971d3"; // First dish

const userId2 = "663d6e6c7643576b26aa5499"; // Alice
const dishId2 = "663d80b7f6597992c77971d3";

const operator = "-";

export function runCartTest() {
  updateCart(userId2, dishId2, operator);
}

// function calculateTotal(userCart: Cart) {
//   let total = 0;

//   for (const cartItem of userCart) {
//     total += cartItem.subtotal;
//   }

//   return total.toFixed(2);
// }
