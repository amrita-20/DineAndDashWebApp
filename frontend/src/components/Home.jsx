import { useEffect, useReducer } from "react";

import { fetchMenu } from "../services";
import reducer, { initialState } from "../reducer";

import NavBar from "./NavBar";
import { ACTIONS } from "../constant";

import "../css/Home.css";

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onFetchMenu() {
    fetchMenu()
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_MENU, payload: data.menu });
        console.log(data.menu)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    onFetchMenu();
  }, []);

  return (
    <div>
      <NavBar />
        <ul className="cards">
          {state.menu.map((dish) => (
            <li className="card" key={dish._id}>
              <div className="card-image-container">
                <img className="card-image" src={dish.imagePath} alt={dish.name} />
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
    </div>
  );
}

export default Home;
