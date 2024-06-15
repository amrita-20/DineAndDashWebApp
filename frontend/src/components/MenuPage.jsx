import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

import Error from "./Error";

import "../css/MenuPage.css";
import { Menu } from "@mui/icons-material";

const menu = [
  "salad",
  "rice",
  "pizza",
  "noodles",
  "paella",
  "steak",
  "seafood",
  "appetizer",
  "dessert",
  "cheese",
  "wine",
];

function MenuPage({
  addToCart,
  filterMenu,
  filteredMenu,
  setFilteredMenu,
  onFetchMenu,
  menuDetails,
  isLoading,
  error,
}) {
  // Drawer
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Filter
  const [showMenu, setShowMenu] = useState(false);
  function handleOnclick(e) {
    const filter = e.currentTarget.getAttribute("name");
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
      <Paper
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          position: "sticky",
          top: "4rem",
        }}
      >
        {menu.map((dish) => (
          <Button
            color="inherit"
            key={dish}
            name={dish}
            onClick={handleOnclick}
          >
            {dish}
          </Button>
        ))}
      </Paper>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          top: "4rem",
        }}
      >
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <Menu />
        </IconButton>
      </Paper>
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {menu.map((dish, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton name={dish} onClick={handleOnclick}>
                  <ListItemText primary={dish} sx={{ textAlign: "center" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
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
