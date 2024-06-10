import { useState } from "react";
import NavBar from "./NavBar";

function Layout ({children, cartItems}) {
   

    return(
       <>
        <NavBar cartItems={cartItems} />
        <div>{children}</div>
       </>
    )
}

export default Layout;