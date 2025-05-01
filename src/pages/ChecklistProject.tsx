import { useState } from "react";
import "../styles/travel.css";

type ItemsProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const Logo = () => {
  return <h1 className="checklist-header">✈️Far Away</h1>;
};

const Form = ({
  setCheckList,
}: {
  checkList?: ItemsProps[];
  setCheckList: React.Dispatch<React.SetStateAction<ItemsProps[]>>;
}) => {
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
        packed: false,
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

const PackingList = ({
  checkList,
  onHandleDelete,
}: {
  checkList: ItemsProps[];
  onHandleDelete: (id: number) => void;
}) => {
  return (
    <div className="list">
      <ul>
        {checkList.map((item, index) => {
          return (
            <Item
              onHandleDelete={onHandleDelete}
              id={item.id}
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

const Item = (props: ItemsProps & { onHandleDelete: (id: number) => void }) => {
  return (
    <li>
      <span
        style={{
          textDecoration: `${props.packed && "line-through"}`,
        }}
      >
        {props.quantity} {props.description}
      </span>
      <button onClick={() => props.onHandleDelete(props.id!)}>❌</button>
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

const CheckList = () => {
  const [checkList, setCheckList] = useState<ItemsProps[]>([]);

  const handleDelete = (id: number) => {
    setCheckList((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="app">
      <Logo />
      <Form checkList={checkList} setCheckList={setCheckList} />
      <PackingList checkList={checkList} onHandleDelete={handleDelete} />
      <Stats />
    </div>
  );
};

export default CheckList;
