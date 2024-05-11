import Dish from "../schemas/Dish";

interface Dish {
  name: string;
  description: string;
  price: number;
  dishType: string;
  imagePath: string;
}

async function addDish(
  name: string,
  description: string,
  price: number,
  dishType: string,
  imagePath: string
) {
  const newDish = {
    name,
    description,
    price,
    dishType,
    imagePath,
  };

  // Create new user in mongoDB
  const addResult = await Dish.create(newDish);
  console.log("Add result:", addResult);
  return !!addResult._id;
}

export function runAddDish() {
  addDish(
    "Nasi Goreng Platter",
    "Indonesian fried rice with chicken, shrimp, vegetables, and a fried egg. A flavorful and satisfying dish perfect for any meal.",
    14.99,
    "rice",
    "./images/antonio-castellano-L21rHkekYvo-unsplash.jpg"
  );

  addDish(
    "Fried Rice with Egg",
    "Savory fried rice with fluffy scrambled eggs and diced carrots. A quick and easy meal that's perfect for any time of day.",
    9.99,
    "rice",
    "./images/kalyani-akella-vCNLO20cuwY-unsplash.jpg"
  );

  addDish(
    "Paella Valenciana",
    "Traditional Spanish rice dish with chicken, seafood, vegetables, and saffron. A flavorful and iconic dish perfect for sharing.",
    24.99,
    "rice",
    "./images/armando-brenlha-EufUgeuCa7Y-unsplash.jpg"
  );

  addDish(
    "Shrimp Scampi",
    "Juicy shrimp sauteed in a garlic-lemon butter sauce. A light and flavorful dish perfect for any occasion.",
    17.99,
    "seafood",
    "./images/kaitlin-dowis-VjM2t7VH9Uo-unsplash.jpg"
  );

  addDish(
    "Napolitan Paella with Lemon Dill Sauce",
    "Freshly grilled salmon topped with a zesty lemon dill sauce. A healthy and delicious option.",
    22.5,
    "paella",
    "./images/sandra-wei-pgMKhgvf1O4-unsplash.jpg"
  );

  addDish(
    "Strawberry Tiramisu",
    "Classic Italian dessert with ladyfingers dipped in coffee, layered with mascarpone cream, and dusted with cocoa powder.",
    8.99,
    "dessert",
    "./images/alexandra-torro-Z5GbxHSSahM-unsplash.jpg"
  );

  addDish(
    "Chocolate Peanut Butter Cake",
    "Decadent chocolate cake layered with rich peanut butter frosting. A true choco-peanut lover's dream.",
    9.99,
    "dessert",
    "./images/syed-maaz-QLSh4y2v93c-unsplash.jpg"
  );

  addDish(
    "Chocolate Cake with Peanuts",
    "Delicious chocolate cake with peanuts. A classic dessert that's perfect for any occasion.",
    9.99,
    "dessert",
    "./images/theo-crazzolara-tFllEKVp19o-unsplash.jpg"
  );

  addDish(
    "White Chocolate Mille-Feuille",
    "Light and flaky puff pastry layers filled with a smooth white chocolate cream. A delicate and delightful dessert.",
    10.99,
    "dessert",
    "./images/leohoho-abiaOxHdVjM-unsplash.jpg"
  );

  addDish(
    "Noodles with Mint",
    "Savory noodle dish with refreshing mint leaves. A light and flavorful option.",
    8.99,
    "noodles",
    "./images/victoria-aleksandrova-n56ZKeW9bVM-unsplash.jpg"
  );

  addDish(
    "Bun Bo Hue",
    "Spicy Vietnamese beef noodle soup with rice vermicelli, lemongrass, and vegetables. A flavorful and hearty dish.",
    18.99,
    "noodles",
    "./images/giancarlo-revolledo-KddlIeXWIIk-unsplash.jpg"
  );

  addDish(
    "Noodles with Walnuts",
    "Savory noodle dish with a delightful crunch from toasted walnuts. A unique and flavorful option.",
    10.99,
    "noodles",
    "./images/sorin-popa-XAxvKp0tdwU-unsplash.jpg"
  );

  addDish(
    "Surf & Turf Chow Mein",
    "Stir-fried noodles bursting with flavor! Shrimp, tender beef, juicy tomatoes, and aromatic seasonings come together in a satisfying medley.",
    19.99,
    "noodles",
    "./images/olayinka-babalola-r01ZopTiEV8-unsplash.jpg"
  );

  addDish(
    "Masala Dosa",
    "Crispy fermented crepe made from rice and lentil batter, filled with a savory potato masala filling. A popular and delicious South Indian dish.",
    13.99,
    "noodles",
    "./images/tommao-wang-IhwcFLl13Gc-unsplash.jpg"
  );

  addDish(
    "Mediterranean Tomato Basil Noodles",
    "Light and flavorful noodle dish with fresh tomatoes, olives, and parsley. A taste of the Mediterranean!",
    15.99,
    "noodles",
    "./images/abhishek-hajare-_3dTLrMwiW8-unsplash.jpg"
  );

  addDish(
    "Spaghetti Aglio e Olio with Cherry Tomatoes & Basil",
    "Simple and flavorful spaghetti with garlic, olive oil, fresh cherry tomatoes, and fragrant basil. A delightful and light pasta dish.",
    14.99,
    "noodles",
    "./images/homescreenify-sA3wymYqyaI-unsplash.jpg"
  );

  addDish(
    "Charcuterie Board",
    "Selection of cured meats, artisan cheeses, accompaniments, and crackers. Perfect for sharing or enjoying as a light meal.",
    13.99,
    "appetizer",
    "./images/jessica-johnston-AStDtmO2ipU-unsplash.jpg"
  );

  addDish(
    "Greek Antipasto Platter",
    "Assortment of marinated olives, juicy grapes, and crumbles of creamy feta cheese. A delightful appetizer platter, perfect for sharing.",
    15.99,
    "appetizer",
    "./images/towfiqu-barbhuiya-X4zRlInfdQg-unsplash.jpg"
  );

  addDish(
    "Charcuterie & Fruit Board",
    "Selection of cured meats, artisan cheeses, fresh seasonal fruits, and accompaniments. A delightful combination of sweet and savory flavors, perfect for sharing or enjoying as a light meal.",
    20.99,
    "appetizer",
    "./images/anto-meneghini-YiaDJAjD1S0-unsplash.jpg"
  );

  addDish(
    "Cheese Platter with Wine Pairing",
    "Selection of artisan cheeses paired with a complimentary glass of wine, fresh seasonal fruits, and crisp crackers. A delightful and sophisticated appetizer platter, perfect for sharing.",
    12.99,
    "cheese",
    "./images/allison-kettlety-R__UYP__GrY-unsplash.jpg"
  );

  addDish(
    "Brie Cheese Trio with Olives & Baguette",
    "A delightful selection of brie cheese accompanied by a variety of marinated olives and a rustic baguette. Perfect for sharing or enjoying as a sophisticated appetizer.",
    18.99,
    "cheese",
    "./images/erik-dungan-MQyCrJVFG8U-unsplash.jpg"
  );

  addDish(
    "Cheese Fondue",
    "Melted cheese fondue served with an assortment of bread cubes, vegetables, and meats for dipping. A fun and interactive dining experience, perfect for sharing with friends and family.",
    24.99,
    "cheese",
    "./images/ana-maltez-FHNJO45Qx_k-unsplash.jpg"
  );

  addDish(
    "Charcuterie & Antipasti Platter",
    "An assortment of cured meats, olives, and nuts for a delightful shared appetizer or light meal. This platter features a variety of flavorful sausages, prosciutto, marinated olives, and walnuts. Perfect for sharing with friends or enjoying solo as a delightful nosh.",
    24.99,
    "cheese",
    "./images/christina-victoria-craft-pQzo-BwmDVQ-unsplash.jpg"
  );

  addDish(
    "Açaí Bowl",
    "Refreshingly thick and nutritious açaí berry smoothie bowl topped with granola, banana slices, and blueberries. A perfect healthy and delicious breakfast or snack option.",
    12.99,
    "appetizer",
    "./images/onder-ortel-AWi9-8mgVUo-unsplash.jpg"
  );

  addDish(
    "Chicken Caesar Salad",
    "Classic chopped romaine lettuce salad with grilled chicken, creamy Caesar dressing, parmesan cheese, and croutons. A timeless and delicious lunch option.",
    15.99,
    "salad",
    "./images/melissa-walker-horn-kBtP2IWiYSI-unsplash.jpg"
  );

  addDish(
    "Quiche Lorraine",
    "Savory French tart with a flaky crust filled with eggs, bacon, and cheese. A classic and delicious brunch or lunch option.",
    18.99,
    "salad",
    "./images/alice-donovan-rouse-9MzCd76xLGk-unsplash.jpg"
  );

  addDish(
    "Roquefort Cheese",
    "Aromatic and flavorful French sheep milk blue cheese. Known for its sharp, tangy taste and creamy texture. Enjoy it alone or pair it with fruit, bread, or wine.",
    14.99,
    "cheese",
    "./images/jez-timms-gMW2NZ7JGrE-unsplash.jpg"
  );

  addDish(
    "Grilled Rib-Eye Steak with Seasonal Vegetables",
    "Tender and flavorful grilled rib-eye steak cooked to your preference, served with a selection of seasonal roasted vegetables. A classic and satisfying main course.",
    34.99,
    "steak",
    "./images/jason-leung-O67LZfeyYBk-unsplash.jpg"
  );

  addDish(
    "Grilled Steak with Asparagus",
    "Succulent grilled steak cooked to your preference, served with a side of tender asparagus. A perfect combination of protein and fresh vegetables.",
    39.99,
    "steak",
    "./images/ashley-byrd-YlXvFvfybao-unsplash.jpg"
  );

  addDish(
    "Steak Diane",
    "Pan-seared steak in a creamy mushroom sauce with Dijon mustard, cognac, and herbs. A classic and flavorful French dish.",
    39.99,
    "steak",
    "./images/madie-hamilton-dZ-HI4EuWcA-unsplash.jpg"
  );

  addDish(
    "Beef Wellington",
    "Tenderloin steak coated in pâté and duxelles, wrapped in puff pastry and baked to golden perfection. A luxurious and impressive main course.",
    54.99,
    "steak",
    "./images/loija-nguyen-NYBnDWeOX2c-unsplash.jpg"
  );

  addDish(
    "Steak Frites",
    "Classic French dish featuring a juicy grilled steak served with a side of crispy french fries. A timeless and satisfying combination.",
    32.99,
    "steak",
    "./images/tim-toomey-pe9dvM1rQkM-unsplash.jpg"
  );

  addDish(
    "Spring Garden Salad",
    "A refreshing and light salad with a mix of spring greens, cherry tomatoes, and a sprinkle of Parmesan cheese. Perfect as a light starter or a side dish.",
    5.99,
    "salad",
    "./images/jonathan-ybema-r8A-FTlLY3c-unsplash.jpg"
  );

  addDish(
    "Pad Thai",
    "Stir-fried rice noodles with chicken, shrimp, egg, vegetables, and a flavorful tamarind sauce. A classic and delicious Thai street food dish.",
    18.99,
    "salad",
    "./images/jasmin-schreiber-V2Kw-YC7Cls-unsplash.jpg"
  );

  addDish(
    "Gourmet Salad Selection with Parmesan",
    "An assortment of fresh and flavorful salad greens with a variety of toppings and a generous shaving of Parmigiano-Reggiano cheese. Choose from a selection of dressings to create your perfect salad.",
    16.99,
    "salad",
    "./images/christine-isakzhanova-0IgN3TbE4rM-unsplash.jpg"
  );

  addDish(
    "Classic Club Sandwich",
    "Triple-decker sandwich with toasted bread, sliced chicken or turkey, bacon, lettuce, tomato, and mayonnaise. A timeless and satisfying lunch option.",
    14.99,
    "salad",
    "./images/chris-tweten-FK-UKNip0pE-unsplash.jpg"
  );

  addDish(
    "Spinach Salad with Refreshing Lemonade",
    "A bed of fresh baby spinach topped with your choice of dressings and accompaniments. Served with a cool and thirst-quenching glass of homemade lemonade. Perfect for a light and healthy lunch.",
    15.99,
    "salad",
    "./images/leigh-skomal-kMEeK6-Zu2Q-unsplash.jpg"
  );

  addDish(
    "Create Your Own Avocado Delight Salad",
    "Fresh and flavorful salad greens with a variety of toppings, including creamy avocado slices, to create your perfect healthy meal. Choose from a selection of dressings and additional ingredients to customize your salad.",
    14.99,
    "salad",
    "./images/anna-pelzer-IGfIGP5ONV0-unsplash.jpg"
  );

  addDish(
    "Classic Pizza",
    "Freshly made dough topped with a classic tomato sauce, your choice of mozzarella cheese, and a variety of toppings. Choose from our classic combinations or create your own masterpiece. Perfect for sharing or enjoying as a personal meal.",
    15.99,
    "pizza",
    "./images/food-photographer-Xt84tIHbjRY-unsplash.jpg"
  );

  addDish(
    "Country Pizza",
    "Freshly baked pizza made with our signature dough, topped with your choice of toppings and cheese. A crowd-pleasing and delicious meal for any occasion.",
    15.99,
    "pizza",
    "./images/aurelien-lemasson-theobald-x00CzBt4Dfk-unsplash.jpg"
  );

  addDish(
    "Neapolitan Pizza",
    "Authentic Neapolitan pizza made with simple, high-quality ingredients. Our pizza features a hand-stretched, airy crust cooked in a wood-fired oven for a slightly charred exterior and a soft, chewy interior. Topped with a classic tomato sauce, fresh mozzarella cheese, and basil.  A delicious and timeless Italian staple.",
    17.99,
    "pizza",
    "./images/kelvin-t-AcA8moIiD3g-unsplash.jpg"
  );

  addDish(
    "Mushroom Pizza with Basil & Tomato",
    "Freshly baked pizza topped with a classic tomato sauce, sautéed mushrooms, and fragrant basil leaves. A vegetarian option perfect for any pizza lover.",
    15.99,
    "pizza",
    "./images/vit-ch-Oxb84ENcFfU-unsplash.jpg"
  );

  addDish(
    "Homemade Pizza",
    "Made with love from our kitchen! Our homemade pizza features a crispy crust topped with your choice of our signature tomato sauce or creamy white sauce, a variety of cheeses, and a selection of premium toppings.  Perfect for a casual and delicious meal.",
    14.99,
    "pizza",
    "./images/ivan-torres-MQUqbmszGGM-unsplash.jpg"
  );
}


export async function getMenu() {
  const menu = await Dish.find();
  return menu;
}

export async function getDish(dishId: string) {
  const dish = await Dish.findOne({ _id: dishId })
  return dish;
}
