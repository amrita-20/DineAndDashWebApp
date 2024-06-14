import { Navigate, Route, Routes } from "react-router-dom";
import { useReducer, useState } from "react";

import { ACTIONS } from "./constant";
import reducer, { initialState } from "./reducer";
import { useGetMenuDetails } from "./services/MenuServices";

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
  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // This could be the wrong place for them
  const { menuDetails, isLoading, error } = useGetMenuDetails();

  // Menu
  // Fetch menu
  function onFetchMenu() {
    dispatch({ type: ACTIONS.LOAD_MENU, payload: menuDetails.menu });
  }

  // Filter menu 
  const [filteredMenu, setFilteredMenu] = useState([]); // TODO: move to reducer

  function filterMenu(filter) {
    let filteredMenu;

    if (!filter) {
      filteredMenu = [...state.menu];
    } else {
      filteredMenu = state.menu.filter(
        (item) =>
          item.name.toLowerCase().includes(filter) ||
          item.description.toLowerCase().includes(filter)
      );
    }

    setFilteredMenu(filteredMenu);
  }

  // Cart
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
      <Route
        path="/menu"
        element={
          <Layout cartItems={cartItems}>
            <MenuPage
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              onFetchMenu={onFetchMenu}
              filterMenu={filterMenu}
              filteredMenu={filteredMenu}
              setFilteredMenu={setFilteredMenu}
              menuDetails={menuDetails}
              isLoading={isLoading}
              error={error}
            />
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
