import User, { Cart } from "../schemas/User";
import Dish from "../schemas/Dish";

async function getCartFromUser(userId: string) {
  try {
    const userData = await User.findOne({ _id: userId });
    return userData?.cart || null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function sendToOrder(userId: string) {
  try {
    const userCart = await getCartFromUser(userId);
    const total: string = calculateTotal(userCart);
    return [userCart, total];
  } catch (err) {
    console.log(err);
  }
}

async function updateCart(userId: string, dishId: string, operator: string) {
  try {
    // Retrieve dish object
    const dish = await Dish.findOne({ _id: dishId });
    // Get user cart
    const userCart = await getCartFromUser(userId);
    // Update cart
    const updatedCart = await modifyQuantity(dishId, dish, operator, userCart);
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
  dish,
  operator: string,
  userCart
) {
  const updatedCart = { ...userCart };
  let quantity = 0;

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
  updatedCart[dishId] = { ...dish, quantity, subtotal };

  return updatedCart;
}

function calculateTotal(userCart) {
  return Object.keys(userCart)
    .reduce((total, key) => total + userCart[key].subtotal, 0)
    .toFixed(2);
}
