import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircle } from "@mui/icons-material";

// 以下icons全不要
import HomeIcon from "../assets/home_FILL0_wght400_GRAD0_opsz24.svg";
import SearchIcon from "../assets/search_FILL0_wght400_GRAD0_opsz24.svg";
import AccountIcon from "../assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg";
import CartIcon from "../assets/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg";

import "../css/NavBar.css";
import { IconButton } from "@mui/material";

function NavBar({ cartItems, filterMenu, filteredMenu, setFilteredMenu }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState("");

  function handleSubmitSearch(e) {
    e.preventDefault();
    filterMenu(filter);
    setShowMenu(!showMenu);
  }

  function handleCartItems() {}

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  return (
    <header>
      <div className="logo-container">
        <Link className="button-home" to="/">
          <img className="home-icon" src={HomeIcon} alt="homepage" />
        </Link>
        <h1 className="logo-title">Dish&Dash</h1>
      </div>

      <div className="search-container">
        <form className="form-search" onSubmit={handleSubmitSearch}>
          <input
            type="text"
            className="search"
            placeholder="Search menu..."
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="button-search" type="submit">
            <img className="search-icon" src={SearchIcon} alt="search" />
          </button>
        </form>
      </div>

      <div className="control-container">
        <button className="button-cart" type="button">
          <Link to="/cart">
            <img className="cart-icon" src={CartIcon} alt="cart" />
          </Link>
          <span className="cart-count">{cartItems.length}</span>
        </button>
        {isAuthenticated ? (
          <nav>
            <IconButton
              color="inherit"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem component={Link} to="/menu" onClick={handleClose}>
                Menu
              </MenuItem>

              {user.name === "Amrita Dubey" ? (
                <MenuItem
                  component={Link}
                  to="/order-status"
                  onClick={handleClose}
                >
                  Orders Status
                </MenuItem>
              ) : (
                <MenuItem
                  component={Link}
                  to="/order-management"
                  onClick={handleClose}
                >
                  Orders Management
                </MenuItem>
              )}

              <MenuItem
                component={Link}
                to="/user-profile"
                onClick={handleClose}
              >
                My account
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </nav>
        ) : (
          <button onClick={async () => await loginWithRedirect()}>Login</button>
        )}
      </div>
    </header>
  );
}

export default NavBar;
