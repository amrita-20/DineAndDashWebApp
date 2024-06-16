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
      <main>{children}</main>
    </>
  );
}

export default Layout;
