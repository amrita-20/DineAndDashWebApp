import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom";

import HomeIcon from "../assets/home_FILL0_wght400_GRAD0_opsz24.svg";
import SearchIcon from "../assets/search_FILL0_wght400_GRAD0_opsz24.svg";
import AccountIcon from "../assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg";
import CartIcon from "../assets/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg";

import "../css/NavBar.css";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: rest of the logic
  }

  const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0();
  return (
    <header>
      <div className="logo-container">
        <Link className="button-home" to="/">
          <img className="home-icon" src={HomeIcon} alt="homepage" />
        </Link>
        <h1 className="logo-title">Dish&Dash</h1>
      </div>

      <div className="search-container">
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search menu..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="button-search" type="submit">
            <img className="search-icon" src={SearchIcon} alt="search" />
          </button>
        </form>
      </div>
    
      <div className="control-container">
        {isAuthenticated ? 
        <nav className="dropmenu" onMouseLeave={() => setShowMenu(false)}>
          <button
            className="button-menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              className="account-icon"
              src={AccountIcon}
              alt="control-center"
            />
            {/* <span>{user?.email}</span> */}
          </button>
         

          <ul className={`menu-list ${showMenu ? "show" : ""}`}>
            <li className="menu-item">
                <Link to="/menu">Menu</Link>
            </li>
            <li className="menu-item">
                <Link>Orders</Link>
            </li>
            <li className="menu-item">
                <Link to="/user-profile">Profile</Link>
            </li>
            <li className="menu-item">
                <Link onClick={() => logout()}>Logout</Link>
            </li>
          </ul>
        </nav> : <button onClick={async () => await loginWithRedirect()}>
              Login
            </button>}
      </div>
    </header>
  );
}

export default NavBar;
