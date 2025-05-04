import {
  FriendsProps,
  FriendsType,
  initialFriends,
} from "../lib/EatnSplitFriends";
import { ReactNode, useMemo, useState } from "react";

const EatnSplit = () => {
  const [showForm, setShowForm] = useState(false);
  const [friendsList, setFriendsList] = useState<FriendsType[]>(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<FriendsType | null>(
    null
  );

  const handleSplitBill = (friend: FriendsType) => {
    setFriendsList((prevList) =>
      prevList.map((f) =>
        f.id === friend.id ? { ...f, balance: f.balance + friend.balance } : f
      )
    );
    setSelectedFriend(null);
  };

  return (
    <div className="h-screen text-gray-700 flex items-center justify-center">
      <div className="min-h-[66vh] grid grid-cols-[34rem_44rem] gap-x-16 items-start">
        <div>
          <FriendsList
            setSelected={setSelectedFriend}
            friendsList={friendsList}
            selectedFriend={selectedFriend}
          />
          {showForm && (
            <FormAddFriend
              onAddFriend={(friend) => {
                setFriendsList((prev) => [...prev, friend]);
                setShowForm(false);
              }}
            />
          )}
          <Button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close ✖️" : "Add Friend 🧔"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            onSplitBill={handleSplitBill}
            selectedFriend={selectedFriend}
          />
        )}
      </div>
    </div>
  );
};

const FriendsList = ({
  friendsList,
  setSelected,
  selectedFriend,
}: {
  selectedFriend: FriendsType | null;
  friendsList: FriendsType[];
  setSelected: React.Dispatch<React.SetStateAction<FriendsType | null>>;
}) => (
  <ul className="flex flex-col gap-2 text-[1.4rem] mb-8">
    {friendsList.map((friend) => (
      <Friend
        key={friend.id}
        friend={friend}
        selectedFriend={selectedFriend}
        setSelected={setSelected}
      />
    ))}
  </ul>
);

const Friend = ({
  friend,
  selectedFriend,
  setSelected,
}: FriendsProps & {
  setSelected: React.Dispatch<React.SetStateAction<FriendsType | null>>;
  selectedFriend: FriendsType | null;
}) => {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li
      className={`grid grid-cols-[4.8rem_1fr_auto] items-center gap-x-6 p-5 rounded-lg transition-all duration-500 ${
        isSelected
          ? "bg-red-600 text-white"
          : "hover:bg-red-600 hover:text-white"
      }`}
    >
      <img
        src={friend.image}
        alt={friend.name}
        className="rounded-full w-full row-span-2"
      />
      <h3 className="col-start-2">{friend.name}</h3>
      <p className="col-start-2">
        {friend.balance < 0
          ? `You owe ${friend.name} $${Math.abs(friend.balance)}`
          : friend.balance > 0
          ? `${friend.name} owes you $${friend.balance}`
          : `You and ${friend.name} are even`}
      </p>
      <Button onClick={() => setSelected(isSelected ? null : friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

const FormAddFriend = ({
  onAddFriend,
}: {
  onAddFriend: (newFriend: FriendsType) => void;
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !image) return;

    const id = Date.now();
    const newFriend: FriendsType = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[1fr_1.5fr] gap-4 bg-gray-100 rounded-lg p-4 mb-6 text-[1.6rem]"
    >
      <label className="font-medium">
        Friend Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="mt-1 px-3 py-2 text-center border border-gray-300 rounded-md"
        />
      </label>

      <label className="font-medium">
        Image Url
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          className="mt-1 px-3 py-2 text-center border border-gray-300 rounded-md"
        />
      </label>

      <div className="col-span-2">
        <Button>Add</Button>
      </div>
    </form>
  );
};

const FormSplitBill = ({
  selectedFriend,
  onSplitBill,
}: {
  selectedFriend: FriendsType;
  onSplitBill: (value: FriendsType) => void;
}) => {
  const [billValue, setBillValue] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const paidByFriend = useMemo(
    () => billValue - paidByUser,
    [billValue, paidByUser]
  );
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!billValue || !paidByUser) return;

    const updatedFriend = {
      ...selectedFriend,
      balance:
        whoIsPaying === "user"
          ? selectedFriend.balance + paidByFriend
          : selectedFriend.balance - paidByUser,
    };
    onSplitBill(updatedFriend);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[1fr_12rem] gap-4 bg-gray-100 rounded-lg p-8 text-[1.6rem]"
    >
      <h2 className="col-span-2 text-2xl uppercase tracking-tight mb-4">
        Split a bill with {selectedFriend.name}
      </h2>

      <label className="font-medium">Bill Value</label>
      <input
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
        type="number"
        className="text-center px-3 py-2 border border-gray-300 rounded-md"
      />

      <label className="font-medium">Your expense</label>
      <input
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > billValue
              ? paidByUser
              : Number(e.target.value)
          )
        }
        value={paidByUser}
        type="number"
        className="text-center px-3 py-2 border border-gray-300 rounded-md"
      />

      <label className="font-medium">{selectedFriend.name}'s Expense</label>
      <input
        value={paidByFriend}
        disabled
        className="text-center px-3 py-2 border border-gray-300 rounded-md bg-gray-200"
      />

      <label className="font-medium">Who is paying the bill</label>
      <select
        onChange={(e) => setWhoIsPaying(e.target.value)}
        value={whoIsPaying}
        className="px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <div className="col-span-2">
        <Button>Split Bill</Button>
      </div>
    </form>
  );
};

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="bg-gray-300 hover:bg-gray-800 hover:text-white font-bold px-4 py-2 rounded-md transition"
  >
    {children}
  </button>
);

export default EatnSplit;
