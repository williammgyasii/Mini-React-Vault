import { useState } from "react";
import "../styles/travel.css";

type ItemsProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const Logo = () => {
  return (
    <h1 className="text-center bg-yellow-600 font-[Monoton] text-8xl uppercase font-normal tracking-tight py-10">
      ✈️Far Away
    </h1>
  );
};

const Form = ({
  setCheckList,
}: {
  checkList?: ItemsProps[];
  setCheckList: React.Dispatch<React.SetStateAction<ItemsProps[]>>;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [itemDescription, setItemDescription] = useState("");

  const addToCheckList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!itemDescription) return;

    setCheckList((prev) => [
      ...prev,
      {
        id: Date.now(),
        description: itemDescription,
        quantity,
        packed: false,
      },
    ]);

    setItemDescription("");
    setQuantity(1);
  };

  return (
    <form className="bg-orange-600 py-7 flex items-center justify-center gap-2">
      <h3 className="mr-4 text-2xl">What do you need for your trip? 🥰</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="bg-yellow-200 text-brown-900 font-bold rounded-full py-3 px-8 text-lg"
      >
        {Array.from({ length: 20 }, (_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

      <input
        onChange={(e) => setItemDescription(e.target.value)}
        value={itemDescription}
        placeholder="Item..."
        className="bg-yellow-200 text-brown-900 font-bold rounded-full py-3 px-8 text-lg"
      />

      <button
        type="submit"
        onClick={addToCheckList}
        className="uppercase bg-teal-400 font-bold rounded-full py-3 px-8 text-lg"
      >
        Add
      </button>
    </form>
  );
};

const PackingList = ({
  checkList,
  onHandleDelete,
  onHandleCheck,
  onClearAll,
}: {
  checkList: ItemsProps[];
  onHandleDelete: (id: number) => void;
  onHandleCheck: (id: number) => void;
  onClearAll: () => void;
}) => {
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = [...checkList].sort((a, b) => {
    if (sortBy === "description")
      return a.description.localeCompare(b.description);
    if (sortBy === "packed") return Number(a.packed) - Number(b.packed);
    return 0;
  });

  return (
    <div className="bg-brown-900 text-purple-600 font-bold py-16 flex flex-col items-center gap-8">
      <ul className="list-none flex-1/2 w-4/5 overflow-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 content-start">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            {...item}
            onHandleDelete={onHandleDelete}
            onToggleChecked={onHandleCheck}
          />
        ))}
      </ul>

      <div className="actions flex flex-1/2 items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="uppercase py-2 px-6 text-sm font-bold mx-2"
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        {checkList.length > 0 && (
          <button
            onClick={onClearAll}
            className="uppercase py-2 px-6 text-sm font-bold mx-2"
          >
            Clear List
          </button>
        )}
      </div>
    </div>
  );
};

const Item = ({
  id,
  description,
  quantity,
  packed,
  onHandleDelete,
  onToggleChecked,
}: ItemsProps & {
  onHandleDelete: (id: number) => void;
  onToggleChecked: (id: number) => void;
}) => (
  <li className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={packed}
      onChange={() => onToggleChecked(id)}
      className="w-8 h-8 text-purple-700"
    />
    <span style={{ width: "10rem" }} className={packed ? "line-through" : ""}>
      {quantity} {description}
    </span>
    <button onClick={() => onHandleDelete(id)} className="text-2xl px-2">
      ❌
    </button>
  </li>
);

const Stats = ({ checkListItems }: { checkListItems: ItemsProps[] }) => {
  const numPacked = checkListItems.filter((item) => item.packed).length;
  const numPercentage = checkListItems.length
    ? Math.round((numPacked / checkListItems.length) * 100)
    : 0;

  return (
    <footer className="bg-teal-400 text-center font-bold py-8">
      <em>
        💼 You have {checkListItems.length} items on your list, and you have
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

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all?")) {
      setCheckList([]);
    }
  };

  return (
    <div className="w-full h-screen grid grid-rows-[auto_auto_1fr_auto] text-2xl">
      <Logo />
      <Form setCheckList={setCheckList} />
      <PackingList
        onClearAll={clearAll}
        onHandleCheck={toggleCheckedItem}
        checkList={checkList}
        onHandleDelete={handleDelete}
      />
      <Stats checkListItems={checkList} />
    </div>
  );
};

export default CheckList;
