import User from "../schemas/User";
import Dish, { DishDocument } from "../schemas/Dish";

async function getCartFromUser(userId: string) {
  try {
    const userData = await User.findOne({ _id: userId });
    return userData?.cart || {};
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

// Cart has to be an array of arrays embedded in users
// [
//   [dishId, quanity, subtotal],

// ]



async function updateCart(userId: string, dishId: string, operator: string) {
  try {
    // Retrieve dish object
    const dish = await Dish.findOne({ _id: dishId });
    const dishParam = dish || {};

    // Get user cart
    const userCart = await getCartFromUser(userId);
    // Update cart
    const updatedCart = await modifyQuantity(dishId, dishParam, operator, userCart);
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
    updateCart(userId1, dishId1, operator)
    updateCart(userId2, dishId2, operator)
}

async function modifyQuantity(
  dishId: string,
  dish: object,
  operator: string,
  userCart: object,
) {
  const updatedCart = { ...userCart };
  let quantity: number = 0;

  if (operator === "+") {
    if (!updatedCart[dishId]) {
      quantity = 1;
      updatedCart[dishId] = { ...dish, quantity };
    } else {
      quantity = updatedCart[dishId].quantity + 1;
      updatedCart[dishId].quantity = quantity;
    }
  } else if (updatedCart[dishId] && updatedCart[dishId].quantity > 0) {
    quantity = updatedCart[dishId].quantity - 1;
    updatedCart[dishId].quantity = quantity;
  }

  const dishQuantity = updatedCart[dishId].quantity;
  const dishPrice = parseFloat(dish.price);
  const subtotal = dishQuantity * dishPrice;

  // subtotal. Cart is array of objects
  updatedCart[dishId] = { ...dish, quantity, subtotal };
  // Put this to an array


  return updatedCart;
}

function calculateTotal(userCart: Cart): string {
  return Object.keys(userCart)
    .reduce((total, key) => total + userCart[key].subtotal, 0)
    .toFixed(2);
}
