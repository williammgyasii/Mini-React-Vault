import "../styles/eatnsplit.css";
import { FriendsProps, initialFriends } from "../lib/EatnSplitFriends";
import { ReactNode, useState } from "react";

const EatnSplit = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="eat-split-body">
      <div className="eat-app">
        <div className="sidebar">
          <FriendsList />
          {showForm && <FormAddFriend />}
          <Button handleShowAddFriend={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close ✖️" : "Add Friend 🧔"}
          </Button>
        </div>
        {/* {showForm && <FormSplitBill />} */}
      </div>
    </div>
  );
};
 
const FriendsList = () => {
  return (
    <ul>
      {initialFriends.map((friend) => {
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
  handleShowAddFriend: () => void;
}) => {
  return (
    <button onClick={handleShowAddFriend} className="button">
      {children}
    </button>
  );
};

const FormAddFriend = () => {
  return (
    <form className="form-add-friend">
      <label>Friend Name</label>
      <input type="text" />

      <label>Image Url</label>
      <input type="text" />

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
