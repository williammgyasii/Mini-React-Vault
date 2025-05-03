import "../styles/eatnsplit.css";
import { FriendsProps, initialFriends } from "../lib/EatnSplitFriends";
import { ReactNode } from "react";

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

const EatnSplit = () => {
  return (
    <div className="eat-split-body">
      <div className="eat-app">
        <div className="sidebar">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  return <button className="button">{children}</button>;
};

const FormAddFriend = () => {
  return <div>Add Friend</div>;
};

export default EatnSplit;
