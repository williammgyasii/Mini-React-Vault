import { useState } from "react";
import "../travel.css";

type Props = {};

type ItemsProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const initialItems: ItemsProps[] = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 40, packed: false },
];

const Logo = () => {
  return <h1>✈️Far Away</h1>;
};

const Form = () => {
  const [checkList, setCheckList] = useState<ItemsProps[]>(initialItems);
  const [quantity, setQuantity] = useState(1);
  const [itemDescription, setItemDescription] = useState("");

  const addToCheckList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!itemDescription) return;
    setCheckList((prev) => [
      ...prev,
      {
        id: Date.now(),
        description: itemDescription,
        quantity: quantity,
        packed: true,
      },
    ]);

    setItemDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form">
      <h3>What do you need for your trip? 🥰</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }).map((_, index) => {
          return (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          );
        })}
      </select>

      <input
        onChange={(e) => setItemDescription(e.target.value)}
        type="text"
        value={itemDescription}
        placeholder="Item..."
      />
      <button type="submit" onClick={addToCheckList}>
        Add
      </button>
    </form>
  );
};

const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item, index) => {
          return (
            <Item
              key={index}
              packed={item.packed}
              quantity={item.quantity}
              description={item.description}
            />
          );
        })}
      </ul>
    </div>
  );
};

const Item = (props: Partial<ItemsProps>) => {
  return (
    <li>
      <span
        style={{
          textDecoration: `${props.packed && "line-through"}`,
        }}
      >
        {props.quantity} {props.description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>💼You have X items on your list,and you have packed X (X%)</em>
    </footer>
  );
};

const TravelList = (props: Props) => {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
};

export default TravelList;
