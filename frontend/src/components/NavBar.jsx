import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppBar, Badge, IconButton, Stack, Typography } from "@mui/material";
import {
  AccountCircle,
  Home,
  Login,
  Search,
  ShoppingCart,
} from "@mui/icons-material";

import "../css/NavBar.css";

function NavBar({ cartItems, filterMenu, filteredMenu, setFilteredMenu }) {
  // Dropmenu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Search bar
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
        <IconButton component={Link} to="/" color="inherit">
          <Home />
        </IconButton>
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
          <IconButton className="button-search">
            <Search className="search-icon" sx={{ color: "black" }} />
          </IconButton>
        </form>
      </div>

      {/* TO FIX: the cart only counts different types of dishes, not number of dishes */}
      <div className="control-container">
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

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

              {user.name !== "Amrita Dubey" ? (
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
          <IconButton
            color="inherit"
            onClick={async () => await loginWithRedirect()}
          >
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "initial" } }}
            >
              Login
            </Typography>
            <Login sx={{ display: { xs: "initial", sm: "none" } }} />
          </IconButton>
        )}
      </div>
    </header>
  );
}

export default NavBar;
