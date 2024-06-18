import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import { useCreateCheckoutSession } from "../services/OrderServices";

import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import "../css/Cart.css";

function Cart({ cartItems, setCartItems, addToCart, removeFromCart }) {
  const [modal, setModal] = useState(false);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    return totalInPence;
  };

  const getDeliveryFee = () => {
    const deliveryFee = (getTotalCost() * 10) / 100;
    return deliveryFee;
  };

  const getTotalWithDelivery = () => {
    return (getTotalCost() + getDeliveryFee()).toFixed(2);
  };

  const onCheckout = async (userFormData) => {
    setModal(false);
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        dishId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
        price: cartItem.price,
        imagePath: cartItem.imagePath,
      })),
      deliveryDetails: {
        name: userFormData.name,
        phone: userFormData.phoneNumber,
        email: userFormData.email,
        address: userFormData.address,
      },
      deliveryFee: getDeliveryFee(),
    };

    const data = await createCheckoutSession(checkoutData);
    sessionStorage.setItem("cartItems", []);
    window.location.href = data.url;
  };

  return (
    <>
      <ul className="cart-list">
        {cartItems.map((dish) => (
          <li className="cart-dish" key={dish._id}>
            <div className="dish-image-container">
              <img className="dish-image" src={dish.imagePath} alt="" />
            </div>
            <div className="text-container">
              <span className="dish-name">{dish.name}</span>
              <p className="dish-description">{dish.description}</p>
            </div>

            <span className="dish-price">{dish.price}</span>

            <div className="quantity-control">
              <IconButton
                size="small"
                sx={{ padding: "0" }}
                className="button-decrease"
                type="button"
                disabled={dish.quantity === 0}
                onClick={() => {
                  removeFromCart(dish);
                }}
              >
                <Remove />
              </IconButton>
              <span className="dish-quantity">{dish.quantity}</span>
              <IconButton
                size="small"
                sx={{ padding: "0" }}
                className="button-increase"
                type="button"
                onClick={() => {
                  addToCart(dish);
                }}
              >
                <Add />
              </IconButton>
            </div>
            <span className="dish-subtotal">{dish.quantity * dish.price}</span>
          </li>
        ))}
        {cartItems.length !== 0 ? (
          <>
            <hr />
            <div className="checkout-control">
              <div className="cart-total">
                Delivery Fee: {getDeliveryFee().toFixed(2)}
              </div>
              <div className="cart-total">Total: {getTotalWithDelivery()}</div>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
                setModal={setModal}
                modal={modal}
              />
            </div>
          </>
        ) : (
          <h2>Cart is empty</h2>
        )}
      </ul>
    </>
  );
}

export default Cart;
