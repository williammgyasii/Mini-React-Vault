import Header from "./components/Header";
import Pizza from "./components/Pizza";
import Steps from "./components/Steps";
import TravelList from "./components/TravelList";
import "./index.css";

//Creating some functions

type PizzaDataType = {
  name: string;
  ingredients: string;
  photoName?: string;
  price?: number;
  soldOut?: boolean;
};

const PizzaData: PizzaDataType[] = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "../public/images/alan-hardman-SU1LFoeEUkk-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "../public/images/ivan-torres-MQUqbmszGGM-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "../public/images/sahal-hameed-Nq9KlQTTEbQ-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "../public/images/shourav-sheikh-a66sGfOnnqQ-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "../public/images/nik-owens-40OJLYVWeeM-unsplash.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "../public/images/ivan-torres-MQUqbmszGGM-unsplash.jpg",
    soldOut: false,
  },
];

function Footer() {
  const hour = new Date().getHours();
  console.log(hour);
  const openHour = 2;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

function Order({
  closeHour,
  openHour,
}: {
  closeHour: number;
  openHour: number;
}) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const Menu = () => {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {PizzaData.map((currentPizza, index) => {
          return (
            <Pizza
              photoName={currentPizza.photoName}
              key={index}
              name={currentPizza.name}
              ingredients={currentPizza.ingredients}
              price={currentPizza.price}
              soldOut={currentPizza.soldOut}
            />
          );
        })}
      </ul>
    </main>
  );
};

function App() {
  return (
    <div className="container">
      <TravelList />
    </div>
  );
}

export default App;
