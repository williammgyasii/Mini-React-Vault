import { useState } from "react";
import "../styles/travel.css";

type ItemsProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

type StatsProps = {
  totalItems: number;
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
  onHandleCheck,
}: {
  checkList: ItemsProps[];
  onHandleDelete: (id: number) => void;
  onHandleCheck: (id: number) => void;
}) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems: ItemsProps[] = [];
  switch (sortBy) {
    case "input":
      sortedItems = checkList;
      break;
    case "description":
      sortedItems = checkList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedItems = checkList
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => {
          return (
            <Item
              onHandleDelete={onHandleDelete}
              id={item.id}
              key={index}
              packed={item.packed}
              quantity={item.quantity}
              description={item.description}
              onToggleChecked={onHandleCheck}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value={"input"}>Sort by input order</option>
          <option value={"description"}>Sort by description</option>
          <option value={"packed"}>Sort by Packed Status</option>
        </select>
      </div>
    </div>
  );
};

const Item = (
  props: ItemsProps & {
    onHandleDelete: (id: number) => void;
    onToggleChecked: (id: number) => void;
  }
) => {
  return (
    <li>
      <input
        type="checkbox"
        value={String(props.packed)}
        onChange={() => props.onToggleChecked(props.id!)}
      />
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

const Stats = ({ checkListItems }: { checkListItems: ItemsProps[] }) => {
  const numPacked = checkListItems.filter((item) => item.packed).length;
  const numPercentage = (numPacked / checkListItems.length) * 100;
  return (
    <footer className="stats">
      <em>
        💼You have {checkListItems.length} items on your list,and you have
        packed {numPacked} ({numPercentage}%)
      </em>
    </footer>
  );
};

const CheckList = () => {
  const [checkList, setCheckList] = useState<ItemsProps[]>([]);

  const handleDelete = (id: number) => {
    setCheckList((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCheckedItem = (id: number) => {
    setCheckList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form checkList={checkList} setCheckList={setCheckList} />
      <PackingList
        onHandleCheck={toggleCheckedItem}
        checkList={checkList}
        onHandleDelete={handleDelete}
      />
      <Stats checkListItems={checkList} />
    </div>
  );
};

export default CheckList;
