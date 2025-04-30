import "../index.css";

type PizzaProps = {
  name: string;
  ingredients: string;
  photoName?: string;
  price?: number;
  soldOut?: boolean;
};
const Pizza = ({
  name,
  ingredients,
  photoName,
  price,
  soldOut,
}: PizzaProps) => {
  return (
    <div className={`pizza ${soldOut ? "sold-out" : null}`}>
      <img src={photoName} alt="Pizza" className="pizza-image object-cover rounded-lg w-12" />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "Sold Out" : "$" + price}</span>
      </div>
    </div>
  );
};

export default Pizza;
