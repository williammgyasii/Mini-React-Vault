import "../styles/eatnsplit.css";
import {
  FriendsProps,
  FriendsType,
  initialFriends,
} from "../lib/EatnSplitFriends";
import { ReactNode, useState } from "react";

const EatnSplit = () => {
  const [showForm, setShowForm] = useState(false);
  const [friendsList, setFriendsList] = useState<FriendsType[]>(initialFriends);
  return (
    <div className="eat-split-body">
      <div className="eat-app">
        <div className="sidebar">
          <FriendsList friendsList={friendsList} />
          {showForm && (
            <FormAddFriend
              setFriends={(friend) => {
                setFriendsList((prev) => [...prev, friend]);
                setShowForm(false);
              }}
            />
          )}
          <Button handleShowAddFriend={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close ✖️" : "Add Friend 🧔"}
          </Button>
        </div>
        {/* {showForm && <FormSplitBill />} */}
      </div>
    </div>
  );
};

const FriendsList = ({ friendsList }: { friendsList: FriendsType[] }) => {
  return (
    <ul>
      {friendsList.map((friend) => {
        return <Friend key={friend.id} friend={friend} />;
      })}
    </ul>
  );
};

const Friend = ({ friend }: FriendsProps) => {
  return (
    <li>
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

      <Button>Select</Button>
    </li>
  );
};

const Button = ({
  children,
  handleShowAddFriend,
}: {
  children: ReactNode;
  handleShowAddFriend?: () => void;
}) => {
  return (
    <button onClick={handleShowAddFriend} className="button">
      {children}
    </button>
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
    console.log(newFriend);
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

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>Bill Value</label>
      <input type="text" />

      <label>Your expense</label>
      <input type="text" />

      <label>X's Value</label>
      <input type="text" />

      <label>Who is paying the bill</label>
      <select>
        <option value={"user"}>You</option>
        <option value={"friend"}>X</option>
      </select>
    </form>
  );
};
export default EatnSplit;
