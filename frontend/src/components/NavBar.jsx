import { useState } from "react";


import HomeIcon from "../assets/home_FILL0_wght400_GRAD0_opsz24.svg";
import SearchIcon from "../assets/search_FILL0_wght400_GRAD0_opsz24.svg";
import AccountIcon from "../assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg";
import CartIcon from "../assets/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg";
import {Link} from "react-router-dom";

import "../css/NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const {loginwithRedirect} = useAuth0();
  return (
    <header>
      <div className="logo-container">
        <Link className="button-home" to="/">
          <img className="home-icon" src={HomeIcon} alt="homepage" />
        </Link>
        <h1 className="logo-title">Dish&Dash</h1>
      </div>
      <div className="control-container">
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
          </button>

          <button onClick={async () => await loginwithRedirect()}>Login</button>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
