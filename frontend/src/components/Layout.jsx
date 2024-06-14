import { useState } from "react";
import NavBar from "./NavBar";

function Layout({
  children,
  cartItems,
  filterMenu,
  filteredMenu,
  setFilteredMenu,
}) {
  return (
    <>
      <NavBar
        cartItems={cartItems}
        filterMenu={filterMenu}
        filteredMenu={filteredMenu}
        setFilteredMenu={setFilteredMenu}
      />
      <div>{children}</div>
    </>
  );
}

export default Layout;
