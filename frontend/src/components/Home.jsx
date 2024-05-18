import { useEffect } from "react";
import { fetchMenu } from "../services";
import NavBar from "./NavBar";

function Home() {
  function onFetchMenu() {
    fetchMenu()
      .then((data) => {
        console.log(data.menu);
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
    </div>
  );
}

export default Home;