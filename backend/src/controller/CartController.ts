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

export async function updateCart(userId: string, dishId: string, operator: string) {
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




// function calculateTotal(userCart: Cart) {
//   let total = 0;

//   for (const cartItem of userCart) {
//     total += cartItem.subtotal;
//   }

//   return total.toFixed(2);
// }

