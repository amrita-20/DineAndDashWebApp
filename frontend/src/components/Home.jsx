import { useEffect, useReducer, useState } from "react";

import { ACTIONS } from "../constant";
import { fetchMenu } from "../services";
import reducer, { initialState } from "../reducer";

import NavBar from "./NavBar";

import Menu from "../assets/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import "../css/Home.css";

function Home() {
  // Put it here???
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showMenu, setShowMenu] = useState(false);

  function handleOnclick(e) {
    setFilter(e.target.name);
  }

  function onFetchMenu() {
    fetchMenu()
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_MENU, payload: data.menu });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    onFetchMenu();
  }, []);

  return (
    <>
      <NavBar />
      <div className="show-menu-button-container">
        <button
          className="button-show-menu"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={Menu} alt="" />
        </button>
      </div>

      <div className={`hamburger-menu ${showMenu ? "open" : ""}`}>
        <button className="button-menu" name="salad" onClick={handleOnclick}>
          Salad
        </button>
        <button className="button-menu" name="rice" onClick={handleOnclick}>
          Rice
        </button>
        <button className="button-menu" name="pizza" onClick={handleOnclick}>
          Pizza
        </button>
        <button className="button-menu" name="noodles" onClick={handleOnclick}>
          Noodles
        </button>
        <button className="button-menu" name="paella" onClick={handleOnclick}>
          Paella
        </button>
        <button className="button-menu" name="steaks" onClick={handleOnclick}>
          Steaks
        </button>{" "}
        <button className="button-menu" name="seafood" onClick={handleOnclick}>
          Seafood
        </button>{" "}
        <button
          className="button-menu"
          name="appetizer"
          onClick={handleOnclick}
        >
          Appetizer
        </button>{" "}
        <button className="button-menu" name="dessert" onClick={handleOnclick}>
          Dessert
        </button>
        <button className="button-menu" name="cheese" onClick={handleOnclick}>
          Cheese
        </button>
        <button className="button-menu" name="wine" onClick={handleOnclick}>
          Wine
        </button>
      </div>

      <ul className="cards">
        {state.menu.map((dish) => (
          <li className="card" key={dish._id}>
            <div className="card-image-container">
              <img
                className="card-image"
                src={dish.imagePath}
                alt={dish.name}
              />
            </div>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <div className="cart-bottom">
              <span>Price: {dish.price}</span>
              <button className="button-add-to-cart">Add + </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
