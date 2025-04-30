//Creating some functions
import Pizza from "../components/Pizza";
import "../styles/pizzaOrder.css";
import { PizzaData } from "../lib/pizzaData";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Barneys Pizza Joint</h1>
    </header>
  );
};

function Order({
  closeHour,
  openHour,
}: {
  closeHour: number;
  openHour: number;
}) {
  return (
    <div className="order py-3">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn text-2xl rounded-lg ">Order</button>
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

export default function PizzaOrderProject() {
  return (
    <div className="container mx-auto">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
