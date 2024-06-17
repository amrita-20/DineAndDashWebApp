import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import "../css/Home.css";

function Home() {
  return (
    <>
      <div className="home-image-container">
        <img
          className="home-image"
          src="/images/vit-ch-Oxb84ENcFfU-unsplash.jpg"
          alt="Pizza"
        />
        <h1 className="home-title">La Vita Bella</h1>
      </div>
      <div className="menu-navigation">
        <Link to="/menu" className="explore-menu">
          Explore Menu
        </Link>
        <p className="home-text">
          Welcome to Dine&Dash, where the spirit of Italy comes alive in our
          Summer Festival of Pizzas! This season, indulge in a vibrant
          celebration of flavors with our artisanal pizzas, crafted to
          perfection by our master pizzaiolos. Savor the sunshine with our
          special creations like the Caprese Delight, featuring sun-ripened
          tomatoes, creamy buffalo mozzarella, and fragrant basil, or the
          Mediterranean Medley, bursting with roasted vegetables, olives, and
          tangy feta cheese. Join us in our festive outdoor garden, adorned with
          twinkling lights and the lively sounds of traditional Italian music,
          making every bite an unforgettable summer experience. Buon appetito!
        </p>
      </div>
    </>
  );
}

export default Home;
