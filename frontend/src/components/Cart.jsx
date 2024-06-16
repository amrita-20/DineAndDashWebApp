import CheckoutButton from "./CheckoutButton";
import { useCreateCheckoutSession } from "../services/OrderServices";

import "../css/Cart.css";

function Cart({
  cartItems,
  addToCart,
  removeFromCart,
  onPlaceOrder,
  info,
  errorMessage,
  setErrorMessage,
}) {
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

  function handleClick(dishId, operator) {
    onUpdateCart({ dishId, operator }); // Here we setCart already. So cart is not empty
  }

  function handleOptionChange(e) {
    setOption(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const orderData = {
      orderItems: cart,
      orderType: option,
    };

    // if (option === 'online' && info.address.length === 0) {
    //   setErrorMessage("Please provide a valid address.")
    //   console.log(errorMessage)
    //   setPage("profile");
    //   return;
    // }

    onPlaceOrder(orderData);
    setPage("processing");
  }

  const onCheckout = async (userFormData) => {
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        dishId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
        price: cartItem.price,
      })),
      deliveryDetails: {
        name: userFormData.name,
        phone: userFormData.phoneNumber,
        email: userFormData.email,
        address: userFormData.address,
      },
      deliveryFee: getDeliveryFee().toFixed(2),
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  return (
    <>
      <ul className="cart-list">
        {cartItems.map((dish) => (
          <li className="cart-dish" key={dish._id}>
            <div className="dish-image-container">
              <img className="dish-image" src={dish.image} alt="" />
            </div>
            <div className="text-container">
              <span className="dish-name">{dish.name}</span>
              <p className="dish-description">{dish.description}</p>
            </div>

            <span className="dish-price">{dish.price}</span>

            <div className="quantity-control">
              <button
                className="button-decrease"
                type="button"
                disabled={dish.quantity === 0}
                onClick={() => {
                  removeFromCart(dish);
                }}
              >
                -
              </button>
              <span className="dish-quantity">{dish.quantity}</span>
              <button
                className="button-increase"
                type="button"
                onClick={() => {
                  addToCart(dish);
                }}
              >
                +
              </button>
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
              {/* <select
                  name="select-mode"
                  id="mode"
                  onChange={handleOptionChange}
                >
                  <option value="table">In store</option>
                  <option value="online">Online</option>
                </select> */}
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
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
