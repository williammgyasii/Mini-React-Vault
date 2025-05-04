import Pizza from "../components/Pizza";
import { PizzaData } from "../lib/pizzaData";

const Header = () => {
  return (
    <header className="w-full py-8">
      <h1 className="relative text-yellow-400 uppercase text-center text-6xl font-light tracking-widest before:content-[''] after:content-[''] before:absolute after:absolute before:h-[3px] after:h-[3px] before:w-16 after:w-16 before:bg-yellow-400 after:bg-yellow-400 before:left-0 after:right-0 before:top-1/2 after:top-1/2">
        Barneys Pizza Joint
      </h1>
    </header>
  );
};

const Order = ({
  closeHour,
  openHour,
}: {
  closeHour: number;
  openHour: number;
}) => {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <p className="text-lg text-center">
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="bg-yellow-400 hover:bg-yellow-300 text-lg font-medium px-8 py-3 rounded-lg transition">
        Order
      </button>
    </div>
  );
};

const Menu = () => {
  return (
    <main className="flex flex-col items-center gap-16 py-12">
      <h2 className="text-2xl font-semibold uppercase tracking-widest border-y-2 border-current py-2">
        Our Menu
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full px-4">
        {PizzaData.map((pizza, index) => (
          <Pizza key={index} {...pizza} />
        ))}
      </ul>
    </main>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 2;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="text-center py-6 text-lg">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
};

export default function PizzaOrderProject() {
  return (
    <div className="max-w-5xl mx-auto font-['Roboto_Mono'] px-4">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
