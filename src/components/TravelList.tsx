import "../travel.css";

type Props = {};

type ItemsProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const initialItems: ItemsProps[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

const Logo = () => {
  return <h1>✈️Far Away</h1>;
};

const Form = () => {
  return (
    <div className="add-form">
      <h3>What do you need for your trip? 🥰</h3>
    </div>
  );
};

const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item, index) => {
          return <li key={index}>{item.description}</li>;
        })}
      </ul>
    </div>
  );
};

const Item = (item: ItemsProps) => {
  return <li>{item.description}</li>;
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
