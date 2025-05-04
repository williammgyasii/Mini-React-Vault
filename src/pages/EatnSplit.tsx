import "../styles/eatnsplit.css";
import {
  FriendsProps,
  FriendsType,
  initialFriends,
} from "../lib/EatnSplitFriends";
import { ReactNode, useMemo, useState } from "react";

const EatnSplit = () => {
  const [showForm, setShowForm] = useState(false);
  const [friendsList, setFriendsList] = useState<FriendsType[]>(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<FriendsType>(null!);

  const handleSplitBill = (friend: FriendsType) => {
    const updatedFriendsList = friendsList.map((f) => {
      if (f.id === friend.id) {
        return {
          ...f,
          balance: f.balance + friend.balance,
        };
      }
      return f;
    });
  };

  return (
    <div className="eat-split-body">
      <div className="eat-app">
        <div className="sidebar">
          <FriendsList
            setSelected={setSelectedFriend}
            friendsList={friendsList}
            selectedFriend={selectedFriend}
          />
          {showForm && (
            <FormAddFriend
              setFriends={(friend) => {
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
  selectedFriend: FriendsType;
  friendsList: FriendsType[];
  setSelected: React.Dispatch<React.SetStateAction<FriendsType>>;
}) => {
  return (
    <ul>
      {friendsList.map((friend) => {
        return (
          <Friend
            selectedFriend={selectedFriend}
            setSelected={setSelected}
            key={friend.id}
            friend={friend}
          />
        );
      })}
    </ul>
  );
};

const Friend = ({
  friend,
  selectedFriend,
  setSelected,
}: FriendsProps & {
  setSelected: React.Dispatch<React.SetStateAction<FriendsType>>;
  selectedFriend: FriendsType;
}) => {
  const isSelected = selectedFriend?.id === friend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and your {friend.name} are even</p>}

      <Button
        onClick={() =>
          setSelected((prev) => (prev?.id === friend?.id ? null! : friend))
        }
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

const FormAddFriend = ({
  setFriends,
}: {
  setFriends: (newFriend: FriendsType) => void;
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now();

    if (!name || !image) return;
    const newFriend: FriendsType = {
      id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    setFriends(newFriend);
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>Image Url</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />

      <Button>Add</Button>
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
    [paidByUser, billValue]
  );
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!billValue || !paidByUser) return;
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill Value</label>
      <input
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
        type="text"
      />

      <label>Your expense</label>
      <input
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > billValue
              ? paidByUser
              : Number(e.target.value)
          )
        }
        value={paidByUser}
        type="text"
      />

      <label>{selectedFriend.name} Value</label>
      <input value={paidByFriend} disabled />

      <label>Who is paying the bill</label>
      <select
        onChange={(e) => setWhoIsPaying(e.target.value)}
        value={whoIsPaying}
      >
        <option value={"user"}>You</option>
        <option value={"friend"}>X</option>
      </select>

      <button
        onClick={() => {
          const friend = {
            ...selectedFriend,
            balance:
              whoIsPaying === "user"
                ? selectedFriend.balance + paidByFriend
                : selectedFriend.balance - paidByUser,
          };
          onSplitBill(friend);
        }}
        type="submit"
      >
        Split Bill
      </button>
    </form>
  );
};

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
export default EatnSplit;
