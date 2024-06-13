import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import AuthCallback from "./components/AuthCallback";
import UserProfilePage from "./components/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/Layout";
import MenuPage from "./components/MenuPage";
import Cart from "./components/Cart";
import OrderStatus from "./components/OrderStatus";
import OrderManage from "./components/OrderManage";

function AppRoutes() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (item) => item._id === cartItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          updatedCartItems = prevCartItems.map((item) =>
            item._id === cartItem._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          updatedCartItems = prevCartItems.filter(
            (item) => item._id !== cartItem._id
          );
        }
      } else {
        updatedCartItems = prevCartItems;
      }

      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout cartItems={cartItems}>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/auth-callback"
        element={
          <Layout cartItems={cartItems}>
            <AuthCallback />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout cartItems={cartItems}>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/menu"
          element={
            <Layout cartItems={cartItems}>
              <MenuPage addToCart={addToCart} removeFromCart={removeFromCart} />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout cartItems={cartItems}>
              <Cart
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </Layout>
          }
        />
        <Route
          path="/order-status"
          element={
            <Layout cartItems={cartItems}>
              <OrderStatus />
            </Layout>
          }
        />
        <Route
          path="/order-management"
          element={
            <Layout cartItems={cartItems}>
              <OrderManage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
