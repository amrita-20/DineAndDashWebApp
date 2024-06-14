import { useEffect, useState } from "react";

import Error from "./Error";
import Menu from "../assets/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg";

import "../css/MenuPage.css";

function MenuPage({
  addToCart,
  filterMenu,
  filteredMenu,
  setFilteredMenu,
  onFetchMenu,
  menuDetails,
  isLoading,
  error
}) {
  const [showMenu, setShowMenu] = useState(false);

  function handleOnclick(e) {
    const filter = e.target.name;
    filterMenu(filter);
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!isLoading && !error) {
      onFetchMenu();
      setFilteredMenu(menuDetails.menu);
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <span>Loading ....</span>;
  }
  if (!menuDetails || error) {
    return <span>Unable to load user details</span>;
  }

  return (
    <>
      <Error errorMessage={error} />
      <div className="show-menu-button-container">
        <button
          className="button-show-menu"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={Menu} alt="menu" />
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
        <button className="button-menu" name="steak" onClick={handleOnclick}>
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
        {filteredMenu.map((dish) => (
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
              <button
                className="button-add-to-cart"
                onClick={() => addToCart(dish)}
              >
                Add +{" "}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MenuPage;
